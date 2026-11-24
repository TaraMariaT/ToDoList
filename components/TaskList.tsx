import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { Task } from '../types/Task';
import TaskItem from './TaskItem';

type TaskListProps = {
    tasks: Task[];
    onToggle: (id: string) => void;
};

export default function TaskList({
    tasks,
    onToggle,
}: TaskListProps) {
    return (
        <FlatList
            data={tasks}
            extraData={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TaskItem
                    task={item}
                    onToggle={onToggle}
                />
            )}
            style={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});
