import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper } from "rn-swiper-list";
import { LinearGradient } from "expo-linear-gradient";
import items from "../mocks/items";

export default function CardSwiper() {
  const ref = useRef();
  const [data, setData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState([]);

  useEffect(() => {
    setData(items);
    setCurrentImageIndex(Array(items.length).fill(0));
  }, []);

  useEffect(() => {
    setCurrentImageIndex(Array(data.length).fill(0));
  }, [data]);

  const handleImageChange = (itemIndex, direction) => {
    if (itemIndex >= data.length || itemIndex < 0) {
      return;
    }

    setCurrentImageIndex((prevState) => {
      const newIndex = [...prevState];
      if (direction === "next") {
        newIndex[itemIndex] =
          (newIndex[itemIndex] + 1) % data[itemIndex].images.length;
      } else if (direction === "prev") {
        newIndex[itemIndex] =
          (newIndex[itemIndex] - 1 + data[itemIndex].images.length) %
          data[itemIndex].images.length;
      }
      return newIndex;
    });
  };

  const renderCard = useCallback(
    (item, index) => {
      return (
        <TouchableWithoutFeedback
          onPress={(e) => {
            const { locationX } = e.nativeEvent;
            if (locationX > 200) {
              handleImageChange(index, "next");
            } else {
              handleImageChange(index, "prev");
            }
          }}
        >
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={item.images[currentImageIndex[index]]}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.barContainer}>
                {item.images.map((_, imgIndex) => (
                  <View
                    key={imgIndex}
                    style={[
                      styles.bar,
                      imgIndex === currentImageIndex[index]
                        ? styles.activeBar
                        : styles.inactiveBar,
                    ]}
                  />
                ))}
              </View>
            </View>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.6)"]}
              style={styles.gradientBottom}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitleText}>{item.title}</Text>
              <Text style={styles.cardDetailsText}>
                {item.price} · {item.location}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [currentImageIndex, data]
  );

  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "green",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>LIKE</Text>
      </View>
    );
  }, []);

  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "red",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>DISLIKE</Text>
      </View>
    );
  }, []);

  const OverlayLabelTop = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "blue",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>PASS</Text>
      </View>
    );
  }, []);

  const handleSwipeEnd = useCallback(() => {
    setData((prevData) => [...prevData, ...items]);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        <Swiper
          ref={ref}
          cardStyle={styles.cardStyle}
          data={data}
          renderCard={renderCard}
          onSwipeRight={(cardIndex) => {
            console.log("onSwipeRight", cardIndex);
          }}
          onSwipedAll={handleSwipeEnd}
          onSwipeLeft={(cardIndex) => {
            console.log("onSwipeLeft", cardIndex);
          }}
          onSwipeTop={(cardIndex) => {
            console.log("onSwipeTop", cardIndex);
          }}
          OverlayLabelRight={OverlayLabelRight}
          OverlayLabelLeft={OverlayLabelLeft}
          OverlayLabelTop={OverlayLabelTop}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    width: "95%",
    height: "90%",
    borderRadius: 15,
    marginVertical: 20,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    height: "75%",
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "25%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardTextContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  cardTitleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  cardDetailsText: {
    fontSize: 18,
    color: "white",
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayLabelText: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 10,
  },
  bar: {
    width: 30,
    height: 6,
    marginHorizontal: 4,
  },
  activeBar: {
    backgroundColor: "#ffffff",
  },
  inactiveBar: {
    backgroundColor: "#cccccc",
  },
});
