import React, { useState } from 'react';

function TodoList({ todos, onToggle, onFixmode, onDelete, onFix, editTodoId }) {
    const [editedTodo, setEditedTodo] = useState('');
    const handleEditInputChange = (event) => {
        setEditedTodo(event.target.value);
    };

    const handleSaveClick = (id) => {
        onFix(id, editedTodo);
        setEditedTodo(''); // 수정 완료 후 상태 초기화
    };

    return (
        <ul>
            {todos.map((todo) => (
            <li key={todo.id}>
                {todo.id === editTodoId ? (
                // 수정 중인 할 일의 입력 폼 표시
                <div>
                    <input
                    type="text"
                    value={editedTodo}
                    onChange={handleEditInputChange}
                    />
                    <button onClick={() => handleSaveClick(todo.id)}>제출</button>
                    <button onClick={() => onDelete(todo.id)} data-testid="delete-button">삭제</button>
                </div>
                ) : (
                // 수정 중이 아닌 할 일 정보 표시
                <div>
                    <label>
                    <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => onToggle(todo.id)}
                    />
                    <span>{todo.todo}</span>
                    </label>
                    <button onClick={() => onFixmode(todo.id)} data-testid="modify-button">수정</button>
                    <button onClick={() => onDelete(todo.id)} data-testid="delete-button">삭제</button>
                </div>
                )}
            </li>
            ))}
        </ul>
    );
}
export default TodoList;
