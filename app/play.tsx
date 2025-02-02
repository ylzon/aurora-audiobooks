import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AnimatePage } from '@/components/animation/AnimatePage';
import { ProgressBar } from '@/components/ProgressBar';
import itemData from '@/mock/items.json';
import { SleepTimer } from '@/features/player/SleepTimer';
import { useTranslation } from 'react-i18next';

export default function PlayScreen() {
  const navigation = useNavigation() as NavigationProp<any>;
  const [currentTime, setCurrentTime] = useState(0);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSleepTimerEnabled, setIsSleepTimerEnabled] = useState(false);
  const [sleepTimerValue, setSleepTimerValue] = useState<string | null>(null);
  const [sleepTimerText, setSleepTimerText] = useState<string | null>(null);
  const {
    media: {
      metadata: {
        title,
        authors,
        narrators
      },
      chapters,
    },
    updatedAt,
    id
  } = itemData as any;
  const currentChapter = chapters[0];
  const imgUrl = `http://192.168.31.5:13378/audiobookshelf/api/items/${id}/cover?ts=${updatedAt}`;
  const { t } = useTranslation();

  return (
    <AnimatePage navigation={navigation}>
      <ImageBackground
        source={{ uri: imgUrl }}
        style={styles.container}
      >
        <BlurView intensity={50} blurReductionFactor={32} tint="dark" style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
              <FontAwesome5 name="chevron-down" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.headerRight}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: imgUrl }}
            style={styles.coverImage}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.chapter}>{currentChapter.title}</Text>
          <Text style={styles.author}>{t('author')}: {authors[0].name}</Text>
          <Text style={styles.narrator}>{t('narrator')}: {narrators[0]}</Text>

          <ProgressBar
            duration={360}
            buffered={120}
            currentTime={currentTime}
            onSlidingComplete={(value) => {
              setCurrentTime(value[0]);
            }}
          />

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton}>
              <AntDesign name="left" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialIcons name="replay-10" size={36} color="#fff" />
            </TouchableOpacity>
            <LinearGradient
              colors={['#4527A0', '#7B57E4']}
              style={styles.playButton}
            >
              <TouchableOpacity>
                <MaterialIcons name="play-arrow" size={36} color="white" />
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialIcons name="forward-10" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <AntDesign name="right" size={36} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.otherControls}>
            <TouchableOpacity
              style={styles.otherControlButton}
              onPress={() => setIsDrawerVisible(true)}
            >
              <View style={styles.otherControlContent}>
                <Ionicons name="moon-outline" size={22} color="#fff" />
                <Text style={styles.otherControlText}>{sleepTimerText || t('sleep-timer')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherControlButton}>
              <View style={styles.otherControlContent}>
                <Ionicons name="speedometer-outline" size={22} color="#fff" />
                <Text style={styles.otherControlText}>1.25x</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherControlButton}>
              <View style={styles.otherControlContent}>
                <Ionicons name="play-skip-forward-circle-outline" size={24} color="#fff" />
                <Text style={styles.otherControlText}>15s/30s</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherControlButton}>
              <View style={styles.otherControlContent}>
                <FontAwesome5 name="list-ul" size={20} color="#fff" />
                <Text style={styles.otherControlText}>{t('chapter-list')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ImageBackground>
      <SleepTimer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        value={sleepTimerValue}
        enabled={isSleepTimerEnabled}
        onValueChange={setSleepTimerValue}
        onSwitchChange={setIsSleepTimerEnabled}
        setSleepTimerText={setSleepTimerText}
      />
    </AnimatePage >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '103%',
    top: -80,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  coverImage: {
    width: 300,
    height: 300,
    borderRadius: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 12,
  },
  chapter: {
    fontSize: 16,
    marginVertical: 4,
    color: 'rgba(255,255,255,0.9)',
    paddingBottom: 12,
    textAlign: 'center',
  },
  author: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  narrator: {
    fontSize: 14,
    marginBottom: 16,
    color: 'rgba(255,255,255,0.6)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    borderRadius: 33,
    padding: 15,
  },
  otherControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  otherControlButton: {
    paddingHorizontal: 12,
  },
  otherControlContent: {
    alignItems: 'center',
    gap: 4,
  },
  otherControlText: {
    marginTop: 2,
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  headerLeft: {
    paddingLeft: 24,
  },
  headerRight: {
    paddingRight: 24,
  },
});
