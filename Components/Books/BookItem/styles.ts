import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6E6F0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEE',
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  infos: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Archivo_700Bold',
    color: '#32264D',
    fontSize: 20,
  },
  author: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 12,
    marginTop: 4,
  },
  summary: {
    marginHorizontal: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6A6180',
    paddingBottom: 5
  }
});

export default styles;
