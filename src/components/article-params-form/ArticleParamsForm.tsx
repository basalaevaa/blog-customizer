import React, { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from 'components/select/Select';
import { Separator } from '../separator';
import { Text } from '../text';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type SetOpen = (value: boolean) => void;

type ArticleParamsFormProps = {
	open: boolean;
	setOpen: SetOpen;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const formClickHandler = (evt: React.MouseEvent) => {
		evt.stopPropagation();
	};

	const toggleOpen = () => {
		props.setOpen(!props.open);
	};

	// Используем хук useState для управления состоянием формы
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleInputChange = (
		propertyName: string,
		selectedOption: OptionType
	) => {
		setFormState((prevState) => ({
			...prevState,
			[propertyName]: selectedOption,
		}));
	};

	return (
		<>
			<ArrowButton willCloseOnClick={props.open} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, props.open && styles.container_open)}
				onClick={formClickHandler}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selectedOption) =>
							handleInputChange('fontFamilyOption', selectedOption)
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selectedOption) =>
							handleInputChange('fontSizeOption', selectedOption)
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selectedOption) =>
							handleInputChange('fontColor', selectedOption)
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selectedOption) =>
							handleInputChange('backgroundColor', selectedOption)
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selectedOption) =>
							handleInputChange('contentWidth', selectedOption)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
