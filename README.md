# sequences
Module with a `Sequence<T>` datatype.

A sequence is anything we can keep asking for more objects of type `T` from.
Might be an array (or anything using the Iterable interface),
a generator, and it might be async (e.g. keep requesting the next
line from a file or other IO-bound operation we want to await).

Users of this type should assume it's async. If it's an array
or other simple type it will be ready immediately, but it's safe
to await its values anyway.

This kind of support is likely to be part of the language soon!

https://github.com/tc39/proposal-iterator-helpers

https://github.com/tc39/proposal-async-iterator-helpers

Until it's available, I've written this helper module.

For more background on this package, see:
https://neil-vass.com/how-do-i-do-that-in-typescript-generator-expressions/
