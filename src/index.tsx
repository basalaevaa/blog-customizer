import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleParamsFormOpened, setArticleParamsFormOpened] =
		useState<boolean>(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// клик на корневом элементе закрывает открытую(!) форму параметров
	const paramsFormCloseHandler = (ev: React.MouseEvent) => {
		if (articleParamsFormOpened) {
			setArticleParamsFormOpened(false);
			ev.stopPropagation();
		}
	};

	const handleFormSubmit = (data: ArticleStateType) => {
		setArticleState(data);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}
			onClick={paramsFormCloseHandler}>
			<ArticleParamsForm
				open={articleParamsFormOpened}
				setOpen={setArticleParamsFormOpened}
				onFormSubmit={handleFormSubmit} // Передаем функцию для обработки данных формы
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
