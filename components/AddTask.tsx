import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

type AddTaskProps = {
    onAdd: (title: string) => void;
};

export default function AddTask({ onAdd }: AddTaskProps) {
    const [title, setTitle] = useState<string>('');

    const handleAdd = () => {
        const trimmedTitle = title.trim();

        if (trimmedTitle.length === 0) {
            return;
        }

        onAdd(trimmedTitle);
        setTitle('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="New task"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={handleAdd}
            >
                Add task
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 8,
    },
    input: {
        marginBottom: 4,
    },
});
