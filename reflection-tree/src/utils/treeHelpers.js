/**
 * Tree Helpers — 100% deterministic logic engine
 * No LLM, no external APIs. Pure local computation.
 */

/**
 * Evaluates a single comparison expression like "axis1:internal >= axis1:external"
 * Supports: >=, >, <=, <, ==, !=
 */
function evaluateSingleComparison(expr, signals) {
  const operators = ['>=', '<=', '!=', '==', '>', '<'];
  let op = null;
  let parts = null;

  for (const operator of operators) {
    if (expr.includes(operator)) {
      op = operator;
      parts = expr.split(operator).map(s => s.trim());
      break;
    }
  }

  if (!op || !parts || parts.length !== 2) {
    console.warn(`Could not parse comparison: "${expr}"`);
    return false;
  }

  const left = resolveValue(parts[0], signals);
  const right = resolveValue(parts[1], signals);

  switch (op) {
    case '>=': return left >= right;
    case '<=': return left <= right;
    case '!=': return left !== right;
    case '==': return left === right;
    case '>':  return left > right;
    case '<':  return left < right;
    default:   return false;
  }
}

/**
 * Resolves a value — either a signal name (lookup in signals) or a numeric literal.
 */
function resolveValue(token, signals) {
  const num = Number(token);
  if (!isNaN(num)) return num;
  return signals[token] || 0;
}

/**
 * Checks if a single token is "truthy" — signal value > 0.
 * Used for simple presence checks like "mood:positive"
 */
function isTruthy(token, signals) {
  return (signals[token.trim()] || 0) > 0;
}

/**
 * Evaluates a full condition string.
 * Supports:
 *   - Comparisons: "axis1:internal >= axis1:external"
 *   - AND conjunctions: "a >= b AND c >= d"
 *   - OR (||) presence checks: "mood:positive || mood:neutral"
 *   - Simple truthy checks: "mood:positive"
 */
export function evaluateCondition(condition, signals) {
  // Handle OR (||) — checks if ANY of the signals are truthy (> 0)
  if (condition.includes('||')) {
    const tokens = condition.split('||').map(s => s.trim());
    return tokens.some(token => {
      // Each token might itself be a comparison or a simple signal name
      if (hasComparisonOperator(token)) {
        return evaluateSingleComparison(token, signals);
      }
      return isTruthy(token, signals);
    });
  }

  // Handle AND — ALL clauses must be true
  if (condition.includes('AND')) {
    const clauses = condition.split(/\s+AND\s+/);
    return clauses.every(clause => {
      const trimmed = clause.trim();
      if (hasComparisonOperator(trimmed)) {
        return evaluateSingleComparison(trimmed, signals);
      }
      return isTruthy(trimmed, signals);
    });
  }

  // Single expression — comparison or truthy check
  if (hasComparisonOperator(condition)) {
    return evaluateSingleComparison(condition, signals);
  }

  return isTruthy(condition, signals);
}

/**
 * Checks if an expression contains a comparison operator.
 */
function hasComparisonOperator(expr) {
  return />=|<=|!=|==|>|</.test(expr);
}

/**
 * Resolves a decision node by evaluating its rules in order.
 * Returns the `next` node ID of the first matching rule, or null.
 */
export function resolveDecisionNode(node, signals) {
  if (!node.rules || !Array.isArray(node.rules)) return null;

  for (const rule of node.rules) {
    if (evaluateCondition(rule.condition, signals)) {
      return rule.next;
    }
  }

  // Fallback: return the last rule's next (acts as default/else)
  return node.rules[node.rules.length - 1]?.next || null;
}

/**
 * Determines the dominant signal within an axis group.
 * e.g., for "axis1", compares axis1:internal vs axis1:external
 */
function getDominant(axisPrefix, signals) {
  const relevant = Object.entries(signals).filter(([key]) => key.startsWith(axisPrefix + ':'));

  if (relevant.length === 0) return 'balanced';

  relevant.sort((a, b) => b[1] - a[1]);

  const topKey = relevant[0][0];
  const label = topKey.split(':')[1];

  // Human-friendly labels
  const labelMap = {
    internal: 'internal',
    external: 'external',
    solo: 'solo-focused',
    collaborative: 'collaboration-driven',
    contribution: 'contribution',
    entitlement: 'entitlement',
    altrocentric: 'altrocentric',
    selfcentric: 'self-centric',
    positive: 'positive',
    negative: 'negative',
    neutral: 'neutral',
    frustrated: 'frustrated',
  };

  return labelMap[label] || label;
}

/**
 * Interpolates placeholders in text like {axis1.dominant}, {axis2.dominant}, {axis3.dominant}
 */
export function interpolateText(text, signals) {
  if (!text) return '';

  return text.replace(/\{(\w+)\.dominant\}/g, (_, axis) => {
    return getDominant(axis, signals);
  });
}
