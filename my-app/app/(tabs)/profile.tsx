import { AuthProperty } from "@/AuthProvider";
import axios from "@/instance";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

export default function TabTwoScreen() {
  const { handleLogout } = AuthProperty();
  const { access_token } = AuthProperty();
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/100"
  );

  const emojisWithIcons = [
    { title: "Adventure", icon: "space-shuttle" },
    { title: "Social", icon: "users" },
    { title: "Individu", icon: "user-alt" },
  ];

  const historyIcon = (category: string) => {
    let iconName;
    switch (category) {
      case "adventure":
        iconName = "space-shuttle";
        break;
      case "social":
        iconName = "users";
        break;

      default:
        iconName = "user-alt";
        break;
    }
    return <Icon name={iconName} />;
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <Text>
        {historyIcon(item.Details[0].category)}
        {"  "}
        {item.Details[0].name}
      </Text>
      <Text
        style={{
          textAlign: "right",
          marginTop: 10,
          fontWeight: "500",
          color: "#eecc6a",
        }}
      >
        +{item.Details[0].point}
      </Text>
    </View>
  );

  const fetchUser = async () => {
    try {
      const { data } = await axios({
        url: "/user/my-profile",
        headers: {
          Authorization: access_token,
        },
      });

      setUser(data);
      validateProfileImage(data.photo);
    } catch (error) {
      console.log(error, "Error =< >=");
    }
  };

  const validateProfileImage = (url) => {
    Image.prefetch(url)
      .then(() => {
        setProfileImage(url);
      })
      .catch(() => {
        setProfileImage("https://via.placeholder.com/100");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerImageContainer}>
        <Image
          source={{
            uri:
              user.thumbnail ||
              "https://t4.ftcdn.net/jpg/03/98/37/09/360_F_398370925_cNmAIHp5m1sKf2dqEWuP3IxgkLBuOaGq.jpg",
          }}
          style={styles.headerImage}
        />
        <Pressable style={styles.logoutButton} onPress={() => handleLogout()}>
          <IconM name="logout" style={styles.logoutIcon} />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </View>
        <View style={styles.editProfileButton}>
          <Link href={"/formEdit"} style={styles.editProfilePressable}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Link>
        </View>
        <View style={styles.profileInfo}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.profileName}>
              {user.name}
              {"  "}
              <Text style={styles.profileUsername}>@{user.username}</Text>
            </Text>
            <Text style={{ color: "gray", fontSize: 14, fontWeight: "400" }}>
              {user.category === "adventure"
                ? "Adventurer"
                : user.category === "social"
                ? "Public-spirited"
                : "Wellness-minded"}
            </Text>

            <View style={styles.progressBarContainer}>
              <Text style={styles.progressBarTitle}>
                Level {Math.floor(user.point / 100)}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${user.point % 100}%` },
                  ]}
                />
              </View>
            </View>
            <Text style={styles.profileBio}>
              {user.description ? user.description : "No description yet"}
            </Text>
          </View>
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>History</Text>
          <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && <Icon name={selectedItem.icon} />}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || "Select category"}
                  </Text>
                  <Icon
                    name={isOpened ? "sort-up" : "sort-down"}
                    style={
                      isOpened
                        ? styles.dropdownButtonArrowStyle2
                        : styles.dropdownButtonArrowStyle
                    }
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
          <FlatList
            data={user.finishedMissions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingTop: 20 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    width: "100%",
    height: 145,
    backgroundColor: "#d3d3d3",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f5f5f5",
  },
  logoutButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  logoutIcon: {
    fontSize: 20,
    color: "black",
  },
  profileContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 5,
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editProfileButton: {
    position: "absolute",
    top: 15,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  editProfilePressable: {
    backgroundColor: "white",
    borderRadius: 12,
    height: 30,
    width: 105,
    borderWidth: 1,
    borderColor: "grey",
    textAlign: "center",
    textAlignVertical: "center",
  },
  editProfileText: {
    color: "grey",
  },
  profileInfo: {
    backgroundColor: "#f5f5f5",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileUsername: {
    color: "gray",
    fontSize: 24,
    fontWeight: "400",
  },
  profileBio: {
    marginTop: 10,
    height: 60,
  },
  progressBarContainer: {
    height: 30,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  progressBarTitle: {
    fontSize: 20,
  },
  progressBar: {
    height: 18,
    width: "75%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#eecc6a",
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  dropdownButtonStyle: {
    width: "100%",
    height: 45,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    marginLeft: "auto",
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    paddingBottom: 10,
  },
  dropdownButtonArrowStyle2: {
    fontSize: 28,
    paddingTop: 10,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  historyItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  historyCard: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: "auto",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
});
