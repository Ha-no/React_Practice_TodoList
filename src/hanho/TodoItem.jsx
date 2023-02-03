import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from './TodoProvider';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text, edit }) {

  const [ open, setOpen ] = useState(false);
  const [ value, setValue ] = useState(text);

  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });

  const onEdit = () => { setOpen( !open ); console.log("CHANGE"); }
  const onChange = e => { setValue( e.target.value ); }
  const onSubmit = e => {
    console.log(e.keyCode)
    if( e.keyCode === 13 ) {
      console.log(1);
      dispatch({
        type: 'UPDATE',
        payload: {
          id: id,
          text: value,
          done: done,
          edit: false
        }
      })
      setOpen( !open );
    }else{
      setValue( e.target.value )
    }
  }

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done} onClick={onEdit} open={open}>{text}</Text>
      {
        open && (
          <div>
            <input onChange={onChange} onKeyDown={onSubmit} value={value} />
          </div>
      )}
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);