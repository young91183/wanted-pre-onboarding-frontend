import React, { useState, useEffect } from 'react';
import TodoList from '../todo/TodoList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const move_page = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'https://www.pre-onboarding-selection-task.shop', // API의 기본 URL
    });

    // Axios 인터셉터 등록
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            } else {
                // 토큰이 비어있을 경우, 사용자를 /signin 경로로 리디렉션합니다.
                move_page('/signin');
            }
            return config;
        },
        (error) => {
            if (error.response && error.response.status === 403) {
                // 403 에러가 발생했을 때, 사용자를 /signin 경로로 리디렉션
                navigate('/signin');
            }
            return Promise.reject(error);
        }
    );

    const fetchTodoList = async () => {
        try {
            const response = await axiosInstance.get('/todos'); // API 경로 수정
            setTodos(response.data); // API 응답 데이터로 할 일 목록 업데이트
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTodoList(); // 페이지 로드 시 할 일 목록 가져오기
    }, []);

    const addTodo = () => {
        const newTask = { id: Date.now(), todo: newTodo, isCompleted: false };
        // API로 새로운 할 일 추가
        axiosInstance
            .post('/todos', { todo: newTodo })
            .then((response) => {
                setTodos([...todos, response.data]); // API 응답 데이터로 목록 업데이트
                setNewTodo('');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const toggleTodo = (id) => {
        // 특정 할 일의 완료 여부를 토글하기
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        // API로 업데이트된 할 일 정보 전송
        axiosInstance
            .put(`/todos/${id}`, { isCompleted: !todos.find((todo) => todo.id === id).isCompleted })
            .then(() => {
                setTodos(updatedTodos); 
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fixModeTodo = (id) => {
        // 수정 모드를 활성화
        setEditTodoId(id);
    };

    const fixTodo = (id, updatedTodo) => {
        // 수정된 할 일 정보를 객체로 생성
        const updatedTask = { todo: updatedTodo, isCompleted: todos.find((todo) => todo.id === id).isCompleted };
    
        // API로 업데이트된 할 일 정보 전송
        axiosInstance
            .put(`/todos/${id}`, updatedTask) // URL 경로 수정 및 데이터 객체 전달
            .then((response) => {
                const updatedTodos = todos.map((todo) =>
                    todo.id === id ? { ...todo, ...response.data } : todo
                );
                setTodos(updatedTodos);
                setEditTodoId(null); // 수정 모드 비활성화
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteTodo = (id) => {
        // 특정 할 일 삭제하기
        axiosInstance
            .delete(`/todos/${id}`)
            .then(() => {
                const updatedTodos = todos.filter((todo) => todo.id !== id);
                setTodos(updatedTodos);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>할 일 목록</h2>
            <input
                type="text"
                placeholder="새로운 할 일 추가"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                data-testid="new-todo-input"
            />
            <button onClick={addTodo} data-testid="new-todo-add-button">
                추가
            </button>
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onFixmode={fixModeTodo}
                onDelete={deleteTodo}
                onFix={fixTodo}
                editTodoId={editTodoId}
            />
        </div>
    );
}

export default Todo;
