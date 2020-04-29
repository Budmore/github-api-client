// https://github.com/streamich/react-use/blob/master/src/useDebounce.ts

import { DependencyList, useEffect } from 'react';
import { useTimeoutFn } from './useTimeoutFn';

export function useDebounce(fn: Function, ms = 0, deps: DependencyList = []): [() => boolean | null, () => void] {
    const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

    useEffect(reset, deps);

    return [isReady, cancel];
}
