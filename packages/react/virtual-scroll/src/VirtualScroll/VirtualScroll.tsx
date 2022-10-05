/** @tossdocs-ignore */

import {
  useMemo,
  useCallback,
  ReactNode,
  ReactElement,
  cloneElement,
  CSSProperties,
  useRef,
  useEffect,
  Children,
} from 'react';
import { VariableSizeTree as Tree } from 'react-vtree';
import VirtualTreeItem from './VirtualScrollItem';
import { VirtualScrollContext } from './useVirtualScrollControls';
import VirtualScrollGroup from './VirtualScrollGroup';
import Autosizer from 'react-virtualized-auto-sizer';

interface Props {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

interface WalkOptions {
  children?: ReactNode[];
  nestedLevel?: number;
}

/**
 * @deprecated v18에서 제거 예정
 */
function VirtualScroll(props: Props) {
  const ref = useRef<Tree<VirtualTreeData> | null>();

  useEffect(() => {
    ref.current?.recomputeTree({
      useDefaultHeight: true,
    });
  });

  const walker = useCallback(
    function* walk(
      refresh: boolean,
      { children = Children.toArray(props.children), nestedLevel = 0 }: WalkOptions = {}
    ): Generator<TreeItem, void> {
      for (const child of children) {
        if (typeof child !== 'object' || child == null || !('props' in child) || child.props.height == null) {
          throw new Error(`VirtualTree의 children으로는 VirtualTree.Item 또는 VirtualTree.Group을 사용해주세요.`);
        }

        const key = child.key as any;

        if (key == null) {
          throw new Error(`VirtualTree의 children은 반드시 key를 가져야 합니다.`);
        }

        const { height, header, defaultOpen } = child.props;

        if (header != null) {
          const isOpen = yield refresh
            ? createTreeItem({
                key,
                height,
                node: child,
                isLeaf: false,
                nestedLevel,
                defaultOpen,
              })
            : key;

          if (isOpen) {
            yield* walk(refresh, { nestedLevel: nestedLevel + 1, children: child.props.children });
          }
        } else {
          if (refresh) {
            yield createTreeItem({
              key,
              height,
              node: child,
              isLeaf: true,
              nestedLevel,
              defaultOpen: true,
            });
          } else {
            yield key;
          }
        }
      }
    },
    // NOTE: 재귀 호출인데 react hooks 룰이 exhaustive deps를 잘못 잡아주고 있음
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.children]
  );

  return (
    <Autosizer className={props.className} style={props.style}>
      {({ width, height }) => (
        <Tree<VirtualTreeData> width={width} height={height} treeWalker={walker}>
          {Node}
        </Tree>
      )}
    </Autosizer>
  );
}

type TreeItem = Readonly<ReturnType<typeof createTreeItem>>;

function createTreeItem({
  key,
  height,
  node,
  isLeaf,
  nestedLevel,
  defaultOpen,
}: {
  key: any;
  height: number;
  node: ReactElement;
  isLeaf: boolean;
  nestedLevel: number;
  defaultOpen: boolean;
}) {
  return {
    defaultHeight: height,
    id: key,
    node,
    isOpenByDefault: defaultOpen,
    isLeaf,
    nestedLevel,
  };
}

interface VirtualTreeData {
  id: symbol | string;
  isOpenByDefault: boolean;
  node: ReactElement;
  isLeaf: boolean;
  nestedLevel: number;
  defaultHeight: number;
}

function Node({
  style,
  height,
  isOpen,
  data: { node, isLeaf, nestedLevel },
  resize,
  toggle,
}: {
  style?: any;
  height: number;
  data: VirtualTreeData;
  resize: (height: number, shouldForceUpdate?: boolean) => void;
  toggle: () => void;
  isOpen: boolean;
}) {
  const item = cloneElement(node, {
    style: {
      ...node.props.style,
      ...style,
    },
  });

  const controls = useMemo(() => {
    return { resize, toggleOpen: toggle, isOpen, height, nestedLevel };
  }, [resize, toggle, isOpen, height, nestedLevel]);

  if (isLeaf) {
    return item;
  } else {
    return <VirtualScrollContext.Provider value={controls}>{item}</VirtualScrollContext.Provider>;
  }
}

VirtualScroll.Autosizer = Autosizer;
VirtualScroll.Group = VirtualScrollGroup;
VirtualScroll.Item = VirtualTreeItem;

export default VirtualScroll;
