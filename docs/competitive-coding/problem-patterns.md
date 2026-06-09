# 🚀 Sliding Window Technique Cheat Sheet

A comprehensive guide and template repository for mastering the **Sliding Window Technique**, a powerful algorithmic pattern used to optimize nested loop solutions from **O(n²)** or **O(n³)** down to **O(n)** time complexity.

---

## 📖 Table of Contents

- [💡 What is the Sliding Window Technique?](#-what-is-the-sliding-window-technique)
- [🔍 How to Identify Sliding Window Problems](#-how-to-identify-sliding-window-problems)
- [1. Fixed-Size Sliding Window](#1-fixed-size-sliding-window)
  - [Conceptual Diagram](#conceptual-diagram)
  - [Code Template](#code-template-java)
  - [Common LeetCode Examples](#common-leetcode-examples)
- [2. Variable-Size Sliding Window](#2-variable-size-sliding-window)
  - [Conceptual Diagram](#conceptual-diagram-1)
  - [Code Template](#code-template-java-1)
  - [Common LeetCode Examples](#common-leetcode-examples-1)
- [📊 Key Differences & Cheat Sheet](#-key-differences--cheat-sheet)

---

## 💡 What is the Sliding Window Technique?

The Sliding Window Technique involves maintaining a **window** over a contiguous segment of data (usually an array or a string).

Instead of rebuilding the window from scratch at each step, you **slide** the window forward by:

- Adding the new element entering from the right
- Removing the old element exiting from the left

This avoids redundant calculations and significantly improves performance.

---

## 🔍 How to Identify Sliding Window Problems

Look for the following characteristics:

### 1. Contiguous Data Structure

The problem asks for:

- Subarray
- Substring
- Continuous segment

### 2. Optimization Requirement

The problem asks for:

- Maximum
- Minimum
- Longest
- Shortest
- Contains / Valid Window

### 3. Constraint-Based Window

**Fixed Size Examples**

- "Find maximum sum of size K"
- "Average of K consecutive elements"

**Variable Size Examples**

- "Smallest subarray whose sum ≥ target"
- "Longest substring with at most K distinct characters"

---

# 1. Fixed-Size Sliding Window

Use this pattern when the window size is explicitly given.

## Conceptual Diagram

```text
Iter 1:  [ 1   3  -1 ]  -3   5   3   6   7   (Sum = 3)
           ^       ^
           i       j

Iter 2:    1  [ 3  -1  -3 ]  5   3   6   7   (Sum = -1)
                 ^       ^
                 i       j

Add -3, Remove 1
```

## Code Template (Java)

```java
/**
 * Template for Fixed-Size Sliding Window
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1) or O(K)
 */
public int fixedWindowTemplate(int[] nums, int k) {

    int windowState = 0;
    int maxResult = Integer.MIN_VALUE;

    // Build initial window
    for (int i = 0; i < k; i++) {
        windowState += nums[i];
    }

    maxResult = windowState;

    // Slide the window
    for (int j = k; j < nums.length; j++) {

        // Add incoming element
        windowState += nums[j];

        // Remove outgoing element
        windowState -= nums[j - k];

        // Update answer
        maxResult = Math.max(maxResult, windowState);
    }

    return maxResult;
}
```

## Common LeetCode Examples

- LeetCode 643 — Maximum Average Subarray I
- LeetCode 567 — Permutation in String
- LeetCode 438 — Find All Anagrams in a String

---

# 2. Variable-Size Sliding Window

Use this pattern when the window expands and shrinks dynamically based on a condition.

## Conceptual Diagram

```text
Target Sum >= 7

Step 1: Expand Right Pointer

[ 2   3   1   2 ]  4   3   (Sum = 8 >= 7)
  ^           ^
  i           j

Valid Window Size = 4

Step 2: Shrink Left Pointer

  2  [ 3   1   2 ]  4   3   (Sum = 6 < 7)
       ^       ^
       i       j

Invalid Window → Stop Shrinking
```

## Code Template (Java)

```java
/**
 * Template for Variable-Size Sliding Window
 *
 * Time Complexity: O(N)
 * Each element is visited at most twice.
 *
 * Space Complexity: O(1) or O(N)
 */
public int variableWindowTemplate(int[] nums, int target) {

    int result = Integer.MAX_VALUE;
    int windowState = 0;
    int i = 0;

    for (int j = 0; j < nums.length; j++) {

        // Expand window
        windowState += nums[j];

        // Shrink window while valid
        while (windowState >= target) {

            result = Math.min(result, j - i + 1);

            windowState -= nums[i];
            i++;
        }
    }

    return result == Integer.MAX_VALUE ? 0 : result;
}
```

## Common LeetCode Examples

- LeetCode 209 — Minimum Size Subarray Sum
- LeetCode 3 — Longest Substring Without Repeating Characters
- LeetCode 1004 — Max Consecutive Ones III
- LeetCode 76 — Minimum Window Substring

---

# 📊 Key Differences & Cheat Sheet

| Criterion | Fixed-Size Window | Variable-Size Window |
|------------|------------------|----------------------|
| Window Size | Always exactly K | Changes dynamically |
| Pointers | One active pointer (`j`) | Two pointers (`i`, `j`) |
| Expansion | Fixed movement | Dynamic expansion |
| Shrinking | Automatic (`j - k`) | Explicit while-loop |
| Loop Structure | Single loop | Nested `for + while` |
| Result Update | Once per window shift | During window contraction |
| Common Goal | Maximum/Minimum over K elements | Longest/Shortest valid window |
| Time Complexity | O(N) | O(N) |

---

# 🧠 Quick Decision Tree

```text
Does the problem involve a contiguous subarray/substring?

        YES
         |
         v

Is window size fixed (K)?

      YES -----------------> Fixed-Size Sliding Window

      NO
       |
       v

Can the window grow/shrink based on a condition?

      YES -----------------> Variable-Size Sliding Window
```

---

# 🎯 Interview Tips

### Fixed Window

Remember:

```java
Add Incoming
Remove Outgoing
Update Answer
```

### Variable Window

Remember:

```java
Expand Right
Check Condition
Shrink Left
Update Answer
```

### Golden Rule

If you see:

- Subarray
- Substring
- Continuous segment
- Longest
- Shortest
- Maximum
- Minimum

Think:

> "Can I solve this using Sliding Window instead of nested loops?"

---

## ⭐ Time Complexity Advantage

| Approach | Complexity |
|-----------|-----------|
| Brute Force | O(N²) / O(N³) |
| Sliding Window | O(N) |

This optimization is why Sliding Window is one of the most frequently tested patterns in coding interviews and competitive programming.