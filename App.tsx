import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Task } from './types/Task';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'tasks';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks) as Task[]);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(tasks)
        );
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };

    saveTasks();
  }, [tasks, isLoaded]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  if (!isLoaded) {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <Text>Loading tasks...</Text>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.heading}>
          Todo List
        </Text>

        <AddTask onAdd={addTask} />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#EAF2FA',
  },
  heading: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#34445A',
    fontWeight: 'bold',
  },
});
