import {
  NativeScrollEvent,
  RefreshControl,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import React, {MutableRefObject, ReactElement, memo, useState} from 'react';

interface Props<T>
  extends Omit<ScrollViewProps, 'refreshControl' | 'onScroll'> {
  ref?: MutableRefObject<ScrollView | undefined>;
  keyPrefix?: string;
  loading?: boolean;
  refreshing?: RefreshControlProps['refreshing'];
  onRefresh?: RefreshControlProps['onRefresh'];
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  style?: StyleProp<ViewStyle>;
  data: T[];
  renderItem: ({item: T, i: number}) => ReactElement;
  LoadingView?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  numColumns?: number;
}

const isCloseToBottom = (
  {layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent,
  onEndReachedThreshold: number,
): boolean => {
  const paddingToBottom = contentSize.height * onEndReachedThreshold;

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

function MasonryList<T>(props: Props<T>): ReactElement {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const {
    keyPrefix,
    refreshing,
    data,
    ref,
    ListHeaderComponent,
    ListEmptyComponent,
    ListFooterComponent,
    renderItem,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    loading,
    LoadingView,
    numColumns = 2,
    style,
    horizontal,
  } = props;

  return (
    <ScrollView
      {...props}
      ref={ref}
      style={[{flex: 1, alignSelf: 'stretch'}, style]}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl
          refreshing={!!(refreshing || isRefreshing)}
          onRefresh={() => {
            setIsRefreshing(true);
            onRefresh?.();
            setIsRefreshing(false);
          }}
        />
      }
      scrollEventThrottle={16}
      onScroll={({nativeEvent}: {nativeEvent: NativeScrollEvent}) => {
        if (isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.1))
          onEndReached?.();
      }}>
      {ListHeaderComponent}
      {data.length === 0 && ListEmptyComponent ? (
        React.isValidElement(ListEmptyComponent) ? (
          ListEmptyComponent
        ) : (
          <ListEmptyComponent />
        )
      ) : (
        <View style={{flex: 1, flexDirection: horizontal ? 'column' : 'row'}}>
          {Array.from(Array(numColumns), (_, num) => {
            return (
              <View
                key={`${keyPrefix}-${num.toString()}`}
                style={{
                  flex: 1 / numColumns,
                  flexDirection: horizontal ? 'row' : 'column',
                }}>
                {data
                  .map((el, i) => {
                    if (i % numColumns === num)
                      return renderItem({item: el, i});

                    return null;
                  })
                  .filter((e) => !!e)}
              </View>
            );
          })}
        </View>
      )}
      {loading && LoadingView}
      {ListFooterComponent}
    </ScrollView>
  );
}

export default memo(MasonryList);
