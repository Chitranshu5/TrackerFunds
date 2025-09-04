import EncryptedStorage from 'react-native-encrypted-storage';

const KEY_NAME = 'REALM_ENCRYPTION_KEY';

export async function getOrCreateRealmKey(): Promise<Uint8Array> {
  const existing = await EncryptedStorage.getItem(KEY_NAME);
  if (existing) return new Uint8Array(JSON.parse(existing));

  const key = new Uint8Array(64);
  // @ts-ignore
  crypto.getRandomValues(key);

  await EncryptedStorage.setItem(KEY_NAME, JSON.stringify(Array.from(key)));
  return key;
}
