import type { Source } from '../../../types';

// Java 25 java.base Javadoc root, reused across the DSA topics for JDK mapping.
const J = 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base';
const LC = 'https://leetcode.com/tag';

// Authoritative cross-topic references (books + university courses).
const CLRS: Source = {
  title: 'Introduction to Algorithms (CLRS, 4th ed.) — Cormen, Leiserson, Rivest, Stein',
  url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
  type: 'book',
  authoritative: true,
  description: 'The canonical algorithms reference; rigorous proofs and pseudocode.',
};
const SEDGEWICK: Source = {
  title: 'Algorithms (4th ed.) — Sedgewick & Wayne',
  url: 'https://algs4.cs.princeton.edu/home/',
  type: 'book',
  authoritative: true,
  description: 'Java-based algorithms text with runnable implementations.',
};
const SKIENA: Source = {
  title: 'The Algorithm Design Manual (3rd ed.) — Steven Skiena',
  url: 'https://www.algorist.com/',
  type: 'book',
  authoritative: true,
  description: 'Practical war stories plus a catalog of algorithmic problems.',
};
const CP_HANDBOOK: Source = {
  title: "Competitive Programmer's Handbook — Antti Laaksonen",
  url: 'https://cses.fi/book/book.pdf',
  type: 'book',
  authoritative: true,
  description: 'Free PDF covering the full competitive-programming toolkit.',
};
const CTCI: Source = {
  title: 'Cracking the Coding Interview (6th ed.) — Gayle Laakmann McDowell',
  url: 'https://www.crackingthecodinginterview.com/',
  type: 'book',
  authoritative: false,
  description: 'The classic interview-prep problem book.',
};
const MIT_6006: Source = {
  title: 'MIT 6.006 Introduction to Algorithms (OCW)',
  url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
  type: 'tutorial',
  authoritative: true,
  description: 'Full lecture notes and videos on core algorithms.',
};
const PRINCETON_226: Source = {
  title: 'Princeton COS226 (Sedgewick)',
  url: 'https://www.cs.princeton.edu/courses/archive/spring22/cos226/',
  type: 'tutorial',
  authoritative: true,
  description: 'Algorithms-and-data-structures course materials.',
};
const STANFORD_161: Source = {
  title: 'Stanford CS161',
  url: 'https://web.stanford.edu/class/cs161/',
  type: 'tutorial',
  authoritative: true,
  description: 'Design and analysis of algorithms.',
};
const CP_ALGORITHMS: Source = {
  title: 'CP-Algorithms',
  url: 'https://cp-algorithms.com/',
  type: 'article',
  authoritative: true,
  description: 'Community-maintained, high-quality algorithm reference.',
};
const BIGO_CHEATSHEET: Source = {
  title: 'Big-O Cheat Sheet',
  url: 'https://www.bigocheatsheet.com/',
  type: 'article',
  authoritative: false,
  description: 'Quick-reference table of common data-structure/algorithm complexities.',
};
const VISUALGO: Source = {
  title: 'VisuAlgo — algorithm visualizations',
  url: 'https://visualgo.net/',
  type: 'article',
  authoritative: false,
  description: 'Interactive visualizations of data structures and algorithms.',
};

export const DSA_SOURCES: Record<string, Source[]> = {
  'big-o': [
    CLRS,
    MIT_6006,
    BIGO_CHEATSHEET,
    { title: 'java.util Javadoc (complexity notes)', url: `${J}/java/util/package-summary.html`, type: 'javadoc', authoritative: true, description: 'Implementation notes document the cost of each operation.' },
  ],
  'arrays-strings': [
    { title: 'Arrays (Javadoc)', url: `${J}/java/util/Arrays.html`, type: 'javadoc', authoritative: true, description: 'Utility methods for primitive and object arrays.', recommendedReadingOrder: 1 },
    { title: 'StringBuilder (Javadoc)', url: `${J}/java/lang/StringBuilder.html`, type: 'javadoc', authoritative: true, description: 'Mutable string buffer; the answer to String immutability.', recommendedReadingOrder: 2 },
    { title: 'Two Pointers (LeetCode tag)', url: `${LC}/two-pointers/`, type: 'article', authoritative: false, description: 'Curated practice problems for the two-pointers pattern.' },
    { title: 'Sliding Window (LeetCode tag)', url: `${LC}/sliding-window/`, type: 'article', authoritative: false, description: 'Curated practice problems for the sliding-window pattern.' },
    CLRS,
  ],
  'linked-lists': [
    { title: 'LinkedList (Javadoc)', url: `${J}/java/util/LinkedList.html`, type: 'javadoc', authoritative: true, description: 'Doubly-linked list; rarely the right choice in modern Java.', recommendedReadingOrder: 1 },
    CLRS,
    { title: 'Linked List (LeetCode tag)', url: `${LC}/linked-list/`, type: 'article', authoritative: false, description: 'Curated practice problems for the linked-list pattern.' },
  ],
  'stacks-queues': [
    { title: 'ArrayDeque (Javadoc)', url: `${J}/java/util/ArrayDeque.html`, type: 'javadoc', authoritative: true, description: 'The modern default for both stack and queue use cases.', recommendedReadingOrder: 1 },
    { title: 'Deque (Javadoc)', url: `${J}/java/util/Deque.html`, type: 'javadoc', authoritative: true, description: 'Double-ended queue interface.', recommendedReadingOrder: 2 },
    { title: 'Stack (LeetCode tag)', url: `${LC}/stack/`, type: 'article', authoritative: false, description: 'Curated practice problems for the stack pattern.' },
    { title: 'Monotonic Stack (LeetCode tag)', url: `${LC}/monotonic-stack/`, type: 'article', authoritative: false, description: 'Curated practice problems for the monotonic-stack pattern.' },
  ],
  'hash-tables': [
    { title: 'HashMap (Javadoc)', url: `${J}/java/util/HashMap.html`, type: 'javadoc', authoritative: true, description: 'Bucketed hash table with treeified buckets since Java 8.', recommendedReadingOrder: 1 },
    { title: 'HashSet (Javadoc)', url: `${J}/java/util/HashSet.html`, type: 'javadoc', authoritative: true, description: 'Hash-table-backed Set implementation.', recommendedReadingOrder: 2 },
    { title: 'LinkedHashMap (Javadoc)', url: `${J}/java/util/LinkedHashMap.html`, type: 'javadoc', authoritative: true, description: 'Insertion/access order; the basis of a simple LRU cache.' },
    CLRS,
    { title: 'Hash Table (LeetCode tag)', url: `${LC}/hash-table/`, type: 'article', authoritative: false, description: 'Curated practice problems for the hash-table pattern.' },
  ],
  'binary-trees-bst': [
    CLRS,
    { title: 'Tree (LeetCode tag)', url: `${LC}/tree/`, type: 'article', authoritative: false, description: 'Curated practice problems for the tree pattern.' },
    { title: 'Binary Tree (LeetCode tag)', url: `${LC}/binary-tree/`, type: 'article', authoritative: false, description: 'Curated practice problems for the binary-tree pattern.' },
    SEDGEWICK,
  ],
  'balanced-trees': [
    CLRS,
    { title: 'TreeMap (Javadoc)', url: `${J}/java/util/TreeMap.html`, type: 'javadoc', authoritative: true, description: 'Red-black tree implementation of NavigableMap.', recommendedReadingOrder: 1 },
    { title: 'NavigableMap (Javadoc)', url: `${J}/java/util/NavigableMap.html`, type: 'javadoc', authoritative: true, description: 'floor/ceiling/subMap navigation API.', recommendedReadingOrder: 2 },
  ],
  'heaps-priority-queues': [
    CLRS,
    { title: 'PriorityQueue (Javadoc)', url: `${J}/java/util/PriorityQueue.html`, type: 'javadoc', authoritative: true, description: 'Binary-heap min-priority-queue; iterator order is NOT sorted.', recommendedReadingOrder: 1 },
    { title: 'Heap / Priority Queue (LeetCode tag)', url: `${LC}/heap-priority-queue/`, type: 'article', authoritative: false, description: 'Curated practice problems for the heap/priority-queue pattern.' },
  ],
  'tries': [
    { title: 'Trie (LeetCode tag)', url: `${LC}/trie/`, type: 'article', authoritative: false, description: 'Curated practice problems for the trie pattern.' },
    SEDGEWICK,
    CP_ALGORITHMS,
  ],
  'graphs-bfs-dfs': [
    CLRS,
    { title: 'Graph (LeetCode tag)', url: `${LC}/graph/`, type: 'article', authoritative: false, description: 'Curated practice problems for the graph pattern.' },
    { title: 'Breadth-First Search (LeetCode tag)', url: `${LC}/breadth-first-search/`, type: 'article', authoritative: false, description: 'Curated practice problems for the breadth-first-search pattern.' },
    { title: 'Depth-First Search (LeetCode tag)', url: `${LC}/depth-first-search/`, type: 'article', authoritative: false, description: 'Curated practice problems for the depth-first-search pattern.' },
  ],
  'shortest-path-mst': [
    CLRS,
    CP_ALGORITHMS,
    { title: 'Shortest Path (LeetCode tag)', url: `${LC}/shortest-path/`, type: 'article', authoritative: false, description: 'Curated practice problems for the shortest-path pattern.' },
  ],
  'union-find': [
    CLRS,
    CP_ALGORITHMS,
    { title: 'Union Find (LeetCode tag)', url: `${LC}/union-find/`, type: 'article', authoritative: false, description: 'Curated practice problems for the union-find pattern.' },
  ],
  'sorting': [
    CLRS,
    { title: 'Arrays.sort (Javadoc)', url: `${J}/java/util/Arrays.html#sort(int%5B%5D)`, type: 'javadoc', authoritative: true, description: 'Dual-Pivot Quicksort for primitives, Timsort for objects.', recommendedReadingOrder: 1 },
    { title: 'Timsort design notes (listsort.txt)', url: 'https://github.com/python/cpython/blob/main/Objects/listsort.txt', type: 'article', authoritative: true, description: "Tim Peters' original write-up of the adaptive merge sort." },
  ],
  'binary-search': [
    { title: 'Arrays.binarySearch (Javadoc)', url: `${J}/java/util/Arrays.html#binarySearch(int%5B%5D,int)`, type: 'javadoc', authoritative: true, description: 'Binary search over a sorted primitive array.', recommendedReadingOrder: 1 },
    { title: 'Binary Search (LeetCode tag)', url: `${LC}/binary-search/`, type: 'article', authoritative: false, description: 'Curated practice problems for the binary-search pattern.' },
    CLRS,
  ],
  'recursion-backtracking': [
    CLRS,
    { title: 'Backtracking (LeetCode tag)', url: `${LC}/backtracking/`, type: 'article', authoritative: false, description: 'Curated practice problems for the backtracking pattern.' },
    SKIENA,
  ],
  'dynamic-programming': [
    CLRS,
    MIT_6006,
    { title: 'Dynamic Programming (LeetCode tag)', url: `${LC}/dynamic-programming/`, type: 'article', authoritative: false, description: 'Curated practice problems for the dynamic-programming pattern.' },
    CP_HANDBOOK,
  ],
  'greedy': [
    CLRS,
    { title: 'Greedy (LeetCode tag)', url: `${LC}/greedy/`, type: 'article', authoritative: false, description: 'Curated practice problems for the greedy pattern.' },
  ],
  'bit-manipulation': [
    { title: 'Integer (Javadoc)', url: `${J}/java/lang/Integer.html`, type: 'javadoc', authoritative: true, description: 'bitCount, numberOfTrailingZeros, highestOneBit, and friends.', recommendedReadingOrder: 1 },
    { title: 'BitSet (Javadoc)', url: `${J}/java/util/BitSet.html`, type: 'javadoc', authoritative: true, description: 'Arbitrary-length bit arrays.' },
    { title: 'Bit Manipulation (LeetCode tag)', url: `${LC}/bit-manipulation/`, type: 'article', authoritative: false, description: 'Curated practice problems for the bit-manipulation pattern.' },
  ],
  'math-number-theory': [
    CLRS,
    CP_ALGORITHMS,
    { title: 'Math (LeetCode tag)', url: `${LC}/math/`, type: 'article', authoritative: false, description: 'Curated practice problems for the math pattern.' },
  ],
  'pattern-recognition': [
    { title: 'Tech Interview Handbook — Algorithms Study Cheatsheet', url: 'https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/', type: 'article', authoritative: false, description: 'Pattern-to-technique mapping for interview problems.' },
    { title: 'LeetCode Study Guide (Discuss)', url: 'https://leetcode.com/discuss/study-guide', type: 'article', authoritative: false, description: 'Community study guides organized by topic and pattern.' },
    CTCI,
    VISUALGO,
    PRINCETON_226,
    STANFORD_161,
  ],
};
