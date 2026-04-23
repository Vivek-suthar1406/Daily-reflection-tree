import { useState, useCallback, useMemo } from 'react';
import treeData from '../data/reflection-tree.json';
import { resolveDecisionNode, interpolateText } from '../utils/treeHelpers';

/**
 * Custom hook that manages the entire decision tree state.
 * 100% deterministic — all logic is local.
 */
export function useTreeEngine() {
  const [currentNodeId, setCurrentNodeId] = useState('START');
  const [signals, setSignals] = useState({});
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);

  // Build a lookup map: id -> node
  const nodeMap = useMemo(() => {
    const map = {};
    treeData.forEach(node => {
      map[node.id] = node;
    });
    return map;
  }, []);

  // Get the current node object
  const currentNode = useMemo(() => nodeMap[currentNodeId] || null, [nodeMap, currentNodeId]);

  // Total nodes count (non-decision) for progress tracking
  const totalVisibleNodes = useMemo(() => {
    return treeData.filter(n => n.type !== 'decision').length;
  }, []);

  // Count visited visible nodes for progress
  const visitedVisibleNodes = useMemo(() => {
    return history.filter(id => nodeMap[id]?.type !== 'decision').length + 1;
  }, [history, nodeMap]);

  /**
   * Advances to the next node. Handles decision nodes by resolving them
   * recursively until a visible node is reached.
   */
  const advanceToNode = useCallback((nextId, prevId) => {
    if (!nextId) return;

    const nextNode = nodeMap[nextId];
    if (!nextNode) {
      console.warn(`Node "${nextId}" not found in tree data.`);
      return;
    }

    // Push current to history (skip if it's the same)
    if (prevId && prevId !== nextId) {
      setHistory(prev => [...prev, prevId]);
    }

    // If it's a decision node, resolve it immediately (invisible)
    if (nextNode.type === 'decision') {
      const resolvedNext = resolveDecisionNode(nextNode, signals);
      if (resolvedNext) {
        // Push the decision node to history too (for accurate backtracking)
        setHistory(prev => [...prev, nextId]);
        setCurrentNodeId(resolvedNext);
      } else {
        console.warn(`Decision node "${nextId}" could not resolve. Check rules.`);
        setCurrentNodeId(nextId);
      }
    } else {
      setCurrentNodeId(nextId);
    }
  }, [nodeMap, signals]);

  /**
   * Called when user selects a question option.
   */
  const selectOption = useCallback((option) => {
    if (!currentNode) return;

    // Increment the signal
    if (option.signal) {
      setSignals(prev => ({
        ...prev,
        [option.signal]: (prev[option.signal] || 0) + 1,
      }));
    }

    // Store the answer
    setAnswers(prev => ({
      ...prev,
      [currentNode.id]: option.text,
    }));

    // We need to read the latest signals for decision resolution.
    // Since setState is async, we compute what the signals WILL be.
    const updatedSignals = {
      ...signals,
      [option.signal]: (signals[option.signal] || 0) + 1,
    };

    // Advance to the next node
    const nextId = currentNode.next;
    if (!nextId) return;

    const nextNode = nodeMap[nextId];

    setHistory(prev => [...prev, currentNode.id]);

    if (nextNode?.type === 'decision') {
      const resolvedNext = resolveDecisionNode(nextNode, updatedSignals);
      setHistory(prev => [...prev, nextId]);
      setCurrentNodeId(resolvedNext || nextId);
    } else {
      setCurrentNodeId(nextId);
    }
  }, [currentNode, signals, nodeMap]);

  /**
   * Advance to next node (for non-question nodes like start, bridge, reflection).
   */
  const advance = useCallback(() => {
    if (!currentNode || !currentNode.next) return;
    advanceToNode(currentNode.next, currentNode.id);
  }, [currentNode, advanceToNode]);

  /**
   * Go back to the previous visible node.
   */
  const goBack = useCallback(() => {
    if (history.length === 0) return;

    // Pop nodes from history until we find a non-decision node
    const newHistory = [...history];
    let prevId = newHistory.pop();

    while (prevId && nodeMap[prevId]?.type === 'decision' && newHistory.length > 0) {
      prevId = newHistory.pop();
    }

    if (prevId) {
      // If going back to a question node, remove its answer and undo its signal
      const prevNode = nodeMap[prevId];
      if (prevNode?.type === 'question' && answers[prevId]) {
        const answeredOption = prevNode.options?.find(o => o.text === answers[prevId]);
        if (answeredOption?.signal) {
          setSignals(prev => ({
            ...prev,
            [answeredOption.signal]: Math.max(0, (prev[answeredOption.signal] || 0) - 1),
          }));
        }
        setAnswers(prev => {
          const updated = { ...prev };
          delete updated[prevId];
          return updated;
        });
      }

      setHistory(newHistory);
      setCurrentNodeId(prevId);
    }
  }, [history, nodeMap, answers]);

  /**
   * Resolve text interpolation for the current node.
   */
  const resolveText = useCallback((text) => {
    return interpolateText(text, signals);
  }, [signals]);

  return {
    currentNode,
    currentNodeId,
    signals,
    answers,
    history,
    selectOption,
    advance,
    goBack,
    resolveText,
    progress: Math.min(100, Math.round((visitedVisibleNodes / totalVisibleNodes) * 100)),
    canGoBack: history.length > 0,
    isEnd: currentNode?.type === 'end',
  };
}
