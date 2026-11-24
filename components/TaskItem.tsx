
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Task } from '../types/Task';

type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
};

export default function TaskItem({
    task,
    onToggle,
}: TaskItemProps) {
    return (
        <Pressable
            style={[
                styles.container,
                task.completed && styles.completedContainer,
            ]}
            onPress={() => onToggle(task.id)}
        >
            <View style={styles.textContainer}>
                <Text
                    style={[
                        styles.title,
                        task.completed && styles.completed,
                    ]}
                >
                    {task.title}
                </Text>

                {/* textDecorationLine did not update correctly on my Android device,
                so I added a separate View to create a strikethrough effect. */}

                {task.completed && (
                    <View style={styles.strikethrough} />
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#C5D3E0',
    },
    completedContainer: {
        backgroundColor: '#DCE5EF',
    },
    textContainer: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 16,
        color: '#263746',
    },
    completed: {
        color: '#788797',
    },
    strikethrough: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#788797',
        top: '50%',
    },
});
