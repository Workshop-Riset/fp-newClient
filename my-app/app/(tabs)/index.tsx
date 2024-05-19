import { Link } from 'expo-router';
import { Image, StyleSheet, SafeAreaView, View, Text, Dimensions, FlatList } from 'react-native';
const { height, width } = Dimensions.get('window');

const DATA = [
  { name: 'Misi 1', location: 'JAKARTA', poin: 150 },
  { name: 'Misi 2', location: 'SURABAYA Broo', poin: 500 },
  { name: 'Misi 3', location: 'JAKARTA', poin: 250 },
  { name: 'Misi 4', location: 'SURABAYA', poin: 450 },
  { name: 'Misi 5', location: 'JAKARTA', poin: 350 },
];

const Separator = () => <View style={styles.separator} />;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hasbabul-X</Text>
          <Text style={styles.subHeaderText}>Sunday, 25 Apr 2024</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hello bahlul</Text>
          <Text style={styles.cardSubtitle}>Lv.99</Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Daily mission :</Text>
          <View style={styles.missionCard}>
            <Image
              source={{ uri: 'https://akcdn.detik.net.id/visual/2020/10/31/ebel_169.jpeg?w=900&q=90' }}
              style={styles.missionImage}
            />
            <View style={styles.missionInfo}>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{DATA[0].location}</Text>
              </View>
              <Text style={styles.missionName}>Hunter cobra</Text>
              <View style={styles.poinContainer}>
                <Text style={styles.poinText}>+{DATA[0].poin}</Text>
              </View>
            </View>
            <Text style={styles.missionDescription}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Sosial mission for you :</Text>
          <FlatList
            data={DATA}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.missionCard}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/564x/b2/ce/77/b2ce77463fa02f88282b5b59d34db30f.jpg' }}
                  style={styles.missionImage}
                />
                <View style={styles.missionInfo}>
                  <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                  <Text style={styles.missionName}>{item.name}</Text>
                  <View style={styles.poinContainer}>
                    <Text style={styles.poinText}>+{item.poin}</Text>
                  </View>
                </View>
                <Text style={styles.missionDescription}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </Text>
              </View>
            )}
            ItemSeparatorComponent={Separator}
            snapToInterval={width - 30}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
          />
        </View>
      </View>
      <Link href="/login" style={{fontSize: 40, color: "white"}}>Login</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
    padding: 8,
  },
  innerContainer: {
    height: '90%',
    borderRadius: 20,
    gap: 25,
    padding: 12,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 45,
    color: '#fffffe',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 20,
    color: '#a7a9be',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ff8906',
    height: 200,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 35,
  },
  cardSubtitle: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 35,
    marginBottom: 8,
    color: '#fffffe',
  },
  missionCard: {
    height: 200,
    width: width - 40,
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    backgroundColor: '#ff8906',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  missionImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    position: 'absolute',
  },
  missionInfo: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  locationContainer: {
    backgroundColor: '#f25f4c',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  locationText: {
    fontSize: 15,
    color: '#fff',
    zIndex: 1,
  },
  missionName: {
    fontSize: 35,
    color: '#fffffe',
    zIndex: 1,
    fontWeight: 'bold',
  },
  poinContainer: {
    backgroundColor: '#f25f4c',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  poinText: {
    fontSize: 15,
    color: '#fff',
    zIndex: 1,
  },
  missionDescription: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 32,
    color: '#fffffe',
    zIndex: 1,
    fontWeight: 'bold',
  },
  separator: {
    width: 10,
  },
});