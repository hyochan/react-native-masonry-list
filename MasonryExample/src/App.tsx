// eslint-disable-next-line @typescript-eslint/no-use-before-define
import type {FC, ReactElement} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React, {useMemo} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MasonryList from '@react-native-seoul/masonry-list';
import {useTheme} from 'dooboo-ui';

interface Furniture {
  id: string;
  imgURL: string;
  text: string;
}

const data: Furniture[] = [
  {
    id: 'id123',
    imgURL:
      'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pioneer LHS Chaise Lounger in Grey Colour',
  },
  {
    id: 'id124',
    imgURL:
      'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
    text: 'Precedant Furniture',
  },
  {
    id: 'id125',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
    text: 'Leverette Upholstered Platform Bed',
  },
  {
    id: 'id126',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
    text: 'Briget Accent Table',
  },
  {
    id: 'id127',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Rivet Emerly Media Console',
  },
  {
    id: 'id128',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Drew Barrymore Flower Home Accent Chair',
  },
  {
    id: 'id129',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Ecobirdy Charlie Chair',
  },
  {
    id: 'id130',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
    text: 'Hailey Sofa',
  },
  {
    id: 'id131',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
    text: 'Farmhouse Dining Table',
  },
  {
    id: 'id132',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Evelyn Coffee Table',
  },
  {
    id: 'id133',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Slope Nomad Leather Sofa',
  },
  {
    id: 'id134',
    imgURL:
      'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    text: 'Chair and Table',
  },
  {
    id: 'id223',
    imgURL:
      'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pioneer LHS Chaise Lounger in Grey Colour',
  },
  {
    id: 'id224',
    imgURL:
      'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
    text: 'Precedant Furniture',
  },
  {
    id: 'id225',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
    text: 'Leverette Upholstered Platform Bed',
  },
  {
    id: 'id226',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
    text: 'Briget Accent Table',
  },
  {
    id: 'id227',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Rivet Emerly Media Console',
  },
  {
    id: 'id228',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Drew Barrymore Flower Home Accent Chair',
  },
  {
    id: 'id229',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Ecobirdy Charlie Chair',
  },
  {
    id: 'id230',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
    text: 'Hailey Sofa',
  },
  {
    id: 'id231',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
    text: 'Farmhouse Dining Table',
  },
  {
    id: 'id232',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Evelyn Coffee Table',
  },
  {
    id: 'id233',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Slope Nomad Leather Sofa',
  },
  {
    id: 'id234',
    imgURL:
      'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    text: 'Chair and Table',
  },
];

const FurnitureCard: FC<{item: Furniture; style: StyleProp<ViewStyle>}> = ({
  item,
  style,
}) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  const {theme} = useTheme();

  return (
    <View key={item.id} style={[{marginTop: 12, flex: 1}, style]}>
      <Image
        source={{uri: item.imgURL}}
        style={{
          height: randomBool ? 150 : 280,
          alignSelf: 'stretch',
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          marginTop: 8,
          color: theme.text,
        }}
      >
        {item.text}
      </Text>
    </View>
  );
};

const App: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const renderItem = ({item, i}): ReactElement => {
    return (
      <FurnitureCard item={item} style={{marginLeft: i % 2 === 0 ? 0 : 12}} />
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MasonryList
        keyExtractor={(item: Furniture): string => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignSelf: 'stretch',
        }}
        numColumns={2}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default App;
