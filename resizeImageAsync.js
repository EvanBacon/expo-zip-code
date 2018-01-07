import { ImageManipulator } from 'expo';
import AssetUtils from 'expo-asset-utils'; // 0.0.0

export default async (source, resize) => {
  const uri = await AssetUtils.uriAsync(source);
  const image = await ImageManipulator.manipulate(uri, [{ resize }], {
    format: 'png',
  });
  return image;
};
