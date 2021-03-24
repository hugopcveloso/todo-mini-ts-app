import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
	text: string;
	complete: boolean;
}

export default function App() {
	const [value, setValue] = useState<string>("");
	const [todos, setTodos] = useState<ITodo[]>([]);

	const handleSubmit = (e: FormElem) => {
		e.preventDefault();
		addTodo(value);
		setValue("");
	};

	const addTodo = (text: string): void => {
		const newTodos: ITodo[] = [...todos, { text, complete: false }];
		setTodos(newTodos);
	};

	const completeTodo = (index: number): void => {
		const newTodos: ITodo[] = [...todos];
		newTodos[index].complete = !newTodos[index].complete;
		setTodos(newTodos);
	};

	const deleteTodo = (index: number): void => {
		const newTodos: ITodo[] = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<React.Fragment>
			<GlobalStyle />
			<MainStyled>
				<h1>Todo List</h1>
				<form action="" onSubmit={handleSubmit}>
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						required
					/>
					<button type="submit">Add Todo</button>
				</form>
				<ListStyled>
					{todos.map((todo: ITodo, index: number) => {
						return (
							<ListItem key={index}>
								<ListText complete={todo.complete}>{todo.text}</ListText>
								<div>
									<button type="button" onClick={() => completeTodo(index)}>
										{todo.complete ? "Incomplete" : "Complete"}
									</button>
									<button type="button" onClick={() => deleteTodo(index)}>
										&times;
									</button>
								</div>
							</ListItem>
						);
					})}
				</ListStyled>
			</MainStyled>
		</React.Fragment>
	);
}

const GlobalStyle = createGlobalStyle`
	${reset}

`;

const MainStyled = styled.div`
	margin: 0 auto;
	width: 60vw;
	font-family: "Roboto";

	h1 {
		font-size: 40px;
		margin-bottom: 50px;
		margin-top: 20px;
	}
	form {
		display: flex;
		justify-contents: space-between;
		width: 100%;
		margin-bottom: 30px;
		input {
			width: 100%;
			font-size: 17px;
		}
		button {
			width: 30%;
		}
	}
	button {
		font-size: 17px;
		background-color: black;
		color: white;
		outline: none;
		border-radius: none;
		&:hover {
			color: lightblue;
		}
	}
`;

const ListStyled = styled.div``;

const ListItem = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

interface IListText {
	complete: boolean;
}
const ListText = styled.p`
	font-size: 17px;
	margin-right: 20px;
	text-decoration: ${(props: IListText) =>
		props.complete ? "line-through" : ""};
`;
