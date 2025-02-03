import { Colors } from '@/constants/Colors';
import { useColors } from '@/utils/theme';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';

interface TagItem {
  key: string;
  value: string;
}

interface BaseTagsProps {
  tags: TagItem[];
  scrollable?: boolean;
  allowCancel?: boolean;
}

interface SingleTagsProps extends BaseTagsProps {
  multi?: false;
  value: string | null;
  onSelectionChange?: (selectedKey: string | null) => void;
}

interface MultiTagsProps extends BaseTagsProps {
  multi: true;
  value: string[] | null;
  onSelectionChange?: (selectedKeys: string[] | null) => void;
}

type TagsProps = SingleTagsProps | MultiTagsProps;

const FONT_SIZE = 14;
const PADDING = 12;

export function Tags(props: TagsProps) {
  const colors = useColors();
  const [selected, setSelected] = useState<string | string[] | null>(
    props.multi ? [] : null
  );

  useEffect(() => {
    if (props.value !== selected) {
      setSelected(props.value);
    }
  }, [props.value]);

  // 根据 tags 数组最大字符数计算每个标签的宽度
  // const computedTagWidth = useMemo(() => {
  //   const maxTagLength = props.tags.reduce((max, tag) => Math.max(max, tag.value.length), 0);
  //   // 每个字符预估宽度 10，加上左右内边距共 24
  //   return maxTagLength * FONT_SIZE + PADDING * 2;
  // }, [props.tags]);

  function handlePress(tagKey: string) {
    if (props.multi) {
      const currentSelected = selected as string[] | null;
      const newSelected = currentSelected?.includes(tagKey)
        ? currentSelected.filter(t => t !== tagKey)
        : [...(currentSelected || []), tagKey];

      setSelected(newSelected);
      props.onSelectionChange?.(newSelected);
    } else {
      const newSelected = selected === tagKey && props.allowCancel ? null : tagKey;
      setSelected(newSelected);
      props.onSelectionChange?.(newSelected);
    }
  }

  const renderTag = (tag: TagItem, index: number) => {
    const isSelected = props.multi
      ? (selected as string[] | null)?.includes(tag.key) ?? false
      : selected === tag.key;
    return (
      <Pressable
        key={tag.key}
        onPress={() => handlePress(tag.key)}
        style={({ pressed }) => [
          {
            ...styles.tag,
            backgroundColor: colors.tagBackground,
            borderColor: colors.tagBackground,
            opacity: pressed ? 0.8 : 1,
          },
          isSelected && {
            ...styles.tagSelected,
            backgroundColor: colors.tagSelectedBackground,
            borderColor: colors.tagSelectedBackground,
          },
        ]}
      >
        <Text
          style={[
            {
              ...styles.tagText,
              color: colors.tagText,
              fontWeight: '400',
            },
            isSelected && {
              ...styles.tagTextSelected,
              color: colors.tagSelectedText,
            },
          ]}
        >
          {tag.value}
        </Text>
      </Pressable>
    );
  };

  if (props.scrollable) {
    // 横向滚动
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {props.tags.map(renderTag)}
      </ScrollView>
    );
  }

  // 自动换行布局
  return <View style={styles.tagsContainer}>{props.tags.map(renderTag)}</View>;
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: PADDING,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tagSelected: {
  },
  tagText: {
    fontSize: FONT_SIZE,
    textAlign: 'center',
    fontWeight: '500',
  },
  tagTextSelected: {
  },
});
