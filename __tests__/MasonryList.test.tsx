import React, {ReactElement} from 'react';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {Text, View} from 'react-native';

import Template from '../';
import {act} from 'react-test-renderer';

let component: ReactElement;
let testingLib: RenderAPI;

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('Rendering', () => {
  beforeAll(() => {
    component = <Template data={data} renderItem={({i}) => <View key={i} />} />;

    testingLib = render(component);
  });

  it('should render without crashing', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it('should render loading view', async () => {
    component = (
      <Template
        data={data}
        renderItem={({i}) => <View key={i} />}
        LoadingView={<Text>loading</Text>}
        loading={true}
      />
    );

    testingLib = render(component);

    const loading = await testingLib.findByText(/loading/i);

    expect(loading).toBeTruthy();
  });

  describe('Empty View', () => {
    it('should render empty view', async () => {
      component = (
        <Template
          data={[]}
          renderItem={({i}) => <View key={i} />}
          ListEmptyComponent={<Text>empty</Text>}
          loading={true}
        />
      );

      testingLib = render(component);

      const empty = await testingLib.findByText(/empty/i);

      expect(empty).toBeTruthy();
    });

    it('should render functional empty view', async () => {
      component = (
        <Template
          data={[]}
          renderItem={({i}) => <View key={i} />}
          loading={true}
          ListEmptyComponent={() => <Text>functional empty</Text>}
        />
      );

      testingLib = render(component);

      const empty = await testingLib.findByText(/functional empty/i);

      expect(empty).toBeTruthy();
    });
  });

  describe('Refresh', () => {
    it('should handle `refreshing`', async () => {
      component = (
        <Template
          data={[]}
          refreshing={true}
          renderItem={({i}) => <View key={i} />}
        />
      );

      testingLib = render(component);
      expect(testingLib).toBeTruthy();
    });

    it('should trigger `onRefresh`', async () => {
      component = (
        <Template
          testID="masonry-list"
          data={[]}
          refreshing={true}
          onRefresh={() => {}}
          numColumns={3}
          renderItem={({i}) => <View key={i} />}
        />
      );

      testingLib = render(component);

      const masonryList = testingLib.getByTestId('masonry-list');

      expect(masonryList).toBeTruthy();

      act(() => {
        masonryList.props.refreshControl.props.onRefresh();
        masonryList.props.onRefresh();
      });

      expect(masonryList.props.onRefresh).toBeDefined();
    });

    it('should trigger `onRefresh` even when `onRefresh` is not provided', async () => {
      component = (
        <Template
          testID="masonry-list"
          data={[]}
          refreshing={true}
          numColumns={3}
          renderItem={({i}) => <View key={i} />}
        />
      );

      testingLib = render(component);

      const masonryList = testingLib.getByTestId('masonry-list');

      expect(masonryList).toBeTruthy();

      act(() => {
        masonryList.props.refreshControl.props.onRefresh();
      });

      expect(masonryList.props.onRefresh).toBeUndefined();
    });
  });

  describe('Scroll', () => {
    it('should scroll to bottom and call onEndReached', () => {
      const onEndReachedFn = jest.fn();

      component = (
        <Template
          testID="masonry-list"
          data={data}
          renderItem={({i}) => <View key={i} />}
          onEndReached={onEndReachedFn}
        />
      );

      testingLib = render(component);

      const masonryList = testingLib.getByTestId('masonry-list');

      expect(masonryList).toBeTruthy();

      // Scroll to bottom
      fireEvent.scroll(masonryList, {
        nativeEvent: {
          contentSize: {height: 600, width: 400},
          contentOffset: {y: 600, x: 0},
          layoutMeasurement: {height: 100, width: 100},
        },
      });

      expect(onEndReachedFn).toBeCalled();
    });

    it('should not call `onEndReached` when undefined', () => {
      component = (
        <Template
          testID="masonry-list"
          data={data}
          renderItem={({i}) => <View key={i} />}
        />
      );

      testingLib = render(component);

      const masonryList = testingLib.getByTestId('masonry-list');

      expect(masonryList).toBeTruthy();

      // Scroll to bottom
      fireEvent.scroll(masonryList, {
        nativeEvent: {
          contentSize: {height: 600, width: 400},
          contentOffset: {y: 600, x: 0},
          layoutMeasurement: {height: 100, width: 100},
        },
      });

      expect(masonryList.props.onEndReached).toBeUndefined();
    });

    it('should not call `onEndReached` when the scroll not reached close to bottom', () => {
      const onEndReachedFn = jest.fn();

      component = (
        <Template
          testID="masonry-list"
          data={data}
          renderItem={({i}) => <View key={i} />}
          onEndReached={onEndReachedFn}
        />
      );

      testingLib = render(component);

      const masonryList = testingLib.getByTestId('masonry-list');

      expect(masonryList).toBeTruthy();

      // Scroll to bottom
      fireEvent.scroll(masonryList, {
        nativeEvent: {
          contentSize: {height: 600, width: 400},
          contentOffset: {y: 200, x: 0},
          layoutMeasurement: {height: 100, width: 100},
        },
      });

      expect(onEndReachedFn).toBeCalledTimes(0);
    });
  });
});
