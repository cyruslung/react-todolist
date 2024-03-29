import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { StyledTodo } from './StyledTodo'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStore } from '../../redux/store'
import { fetchDataTodo, fetchAddTodo, logOutFetchUser, fetchToggleTodo, fetchDeleteTodo, fetchDeleteAlreadyDownTodo } from '../../redux'

import logo from '../../assets/images/logo.svg'
import add from '../../assets/images/add.svg'
import Vector from '../../assets/images/Vector.svg'
import deleteIcon from '../../assets/images/delete.svg'

interface TypeTodoItem {
    content: string,
    completed_at: boolean,
    id: number
}

type caseStateType = "All" | "unCompleted" | "Completed"

export default function Todo() {
    const { t, i18n } = useTranslation()
    const todoStatus = useSelector((store: RootStore) => store.todoStatus)
    const userStatus = useSelector((store: RootStore) => store.userStatus)
    const dispatch = useDispatch<AppDispatch>()
    const [todoArr, setTodoArr] = useState<TypeTodoItem[] | []>(todoStatus.todo);
    const [filterTodoArr, setFilterTodoArr] = useState<TypeTodoItem[] | []>(todoArr);
    const [todoInput, setTodoInput] = useState<string>('');
    const todoInputRef = useRef<HTMLInputElement>(null);
    const [caseState, setCaseState] = useState<caseStateType>('All');

    const inputTodoItem = (todo: string) => {
        setTodoInput(todo);
    }
    const addTodoItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        dispatch(fetchAddTodo(todoStatus.todo, todoInput));
        (e.target as HTMLInputElement).value = '';
        setTodoInput('');
    };
    const clickAddTodoItem = () => {
        if (todoInput === '') return;
        dispatch(fetchAddTodo(todoStatus.todo, todoInput));
        (todoInputRef.current as HTMLInputElement).value = '';
        setTodoInput('');
    };
    const cleanAlreadyDownTodo = () => {
        if (todoStatus.todo.length === 0) return;
        dispatch(fetchDeleteAlreadyDownTodo(todoStatus.todo))
    }
    const handleAlreadyDone = (idx: number) => {
        dispatch(fetchToggleTodo(todoStatus.todo, idx))
    }
    function handleChangeCaseState<Type extends caseStateType>(value: Type) {
        setCaseState(value);
    }
    const handleDeleteItem = (idx: number) => {
        dispatch(fetchDeleteTodo(todoStatus.todo, idx))
    }
    const handleUserSignOut = () => {
        dispatch(logOutFetchUser())
    }

    useEffect(() => {
        dispatch(fetchDataTodo())
    }, [])

    useEffect(() => {
        if (caseState === 'unCompleted') {
            setFilterTodoArr(
                todoStatus.todo.filter((item) => {
                    return !item.completed_at
                })
            );
        } else if (caseState === 'Completed') {
            setFilterTodoArr(
                todoStatus.todo.filter((item) => {
                    return item.completed_at
                })
            );
        } else {
            setFilterTodoArr(todoStatus.todo);
        }
    }, [todoStatus, caseState])

    return (
        <StyledTodo>
            <div className='todo'>
                <div className="nav">
                    <Link to='/' className="nav_logo">
                        <img src={logo} alt="" />
                    </Link>
                    <div className="nav_user">
                        {userStatus.user} {t('toDoList')}
                    </div>
                    <div className="nav_logout" onClick={handleUserSignOut}>{t('logout')}</div>
                </div>
                <div className="todo_container">
                    <div className="todo_input">
                        <input type="text" placeholder={t('addToDo')} ref={todoInputRef} onChange={(e) => inputTodoItem(e.target.value)} onKeyDown={(e) => addTodoItem(e)} />
                        <div className="addIcon" onClick={clickAddTodoItem}>
                            <img src={add} alt="" />
                        </div>
                    </div>
                    <div className="todo_listBox">
                        <div className="todo_listBox_tab">
                            <div className={caseState === 'All' ? 'todo_listBox_tab_item action' : 'todo_listBox_tab_item'} onClick={() => handleChangeCaseState("All")}>{t('All')}</div>
                            <div className={caseState === 'unCompleted' ? 'todo_listBox_tab_item action' : 'todo_listBox_tab_item'} onClick={() => handleChangeCaseState("unCompleted")}>{t('unCompleted')}</div>
                            <div className={caseState === 'Completed' ? 'todo_listBox_tab_item action' : 'todo_listBox_tab_item'} onClick={() => handleChangeCaseState("Completed")}>{t('Completed')}</div>
                        </div>
                        <div className="todo_listBox_list">
                            {
                                filterTodoArr.length > 0 ?
                                    filterTodoArr.map((item) => {
                                        return (
                                            <div className='todoItem' key={item.id}>
                                                <div className="checkBox" onClick={() => handleAlreadyDone(item.id)}>
                                                    {item.completed_at ? <img src={Vector} alt="" /> : ''}
                                                </div>
                                                <span style={{ textDecoration: item.completed_at ? 'line-through' : 'none' }}>{item.content}</span>
                                                <div className="delete" onClick={() => handleDeleteItem(item.id)}>
                                                    <img src={deleteIcon} alt="" />
                                                </div>
                                            </div>
                                        )
                                    }) :
                                    <div className="empty">
                                        <span>{caseState === 'All' ? t('NoTo-dosYet') : caseState === 'unCompleted' ? t('NoTo-dosYetToBeCompleted') : t('NoTo-dosCompletedYet')}</span>
                                    </div>
                            }
                        </div>
                        <div className="todo_listBox_done">
                            <div className="haveDoneNum">{
                                caseState === 'All' ? `${filterTodoArr.length} ${t('items')}` : caseState === 'unCompleted' ?
                                    `${filterTodoArr.length} ${t('itemsUnCompleted')}`
                                    :
                                    `${filterTodoArr.length} ${t('itemsCompleted')}`
                            }</div>
                            <div className="clearDone" onClick={() => cleanAlreadyDownTodo()}>{t('ClearCompletedItems')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledTodo>
    )
}
