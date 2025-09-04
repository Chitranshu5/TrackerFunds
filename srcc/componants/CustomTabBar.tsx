import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const tabs = [
  { name: 'Home', icon: 'home-outline', activeIcon: 'home', label: 'Home' },
  { name: 'Trans', icon: 'swap-horizontal-outline', activeIcon: 'swap-horizontal', label: 'Transactions' },
  { name: 'User', icon: 'person-outline', activeIcon: 'person', label: 'Profile' },
];

type Props = {
  currentRoute: string;
  onNavigate: (name: string) => void;
};

export default function CustomTabBar({ currentRoute, onNavigate }: Props) {
  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarContent}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            tab={tab}
            isFocused={currentRoute === tab.name}
            onPress={() => onNavigate(tab.name)}
          />
        ))}
      </View>
    </View>
  );
}

const TabButton = ({ tab, isFocused, onPress }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const translateYValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      // Animate in sequence: scale up, then return to normal
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(translateYValue, {
            toValue: -5,
            duration: 150,
            useNativeDriver: true,
          })
        ]),
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(translateYValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          })
        ])
      ]).start();
    }
  }, [isFocused]);

  const handlePress = () => {
    // Pulse animation on press
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 70,
        useNativeDriver: true,
      })
    ]).start();
    
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      <Animated.View style={[
        styles.tabInner,
        isFocused && styles.tabInnerFocused,
        {
          transform: [
            { scale: scaleValue },
            { translateY: translateYValue }
          ]
        }
      ]}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={isFocused ? tab.activeIcon : tab.icon}
            size={22}
            color={isFocused ? '#7c4dff' : '#9e9ea7'}
          />
          {isFocused && <ActiveIndicator />}
        </View>
        <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const ActiveIndicator = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.activeIndicator, { transform: [{ scale: scaleValue }] }]} />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 0,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tabInnerFocused: {
    backgroundColor: 'rgba(124, 77, 255, 0.15)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7c4dff',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9e9ea7',
    marginTop: 2,
  },
  tabLabelFocused: {
    color: '#7c4dff',
    fontWeight: '600',
  },
});