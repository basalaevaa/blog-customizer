import React, { useState, useRef, useEffect } from 'react';
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
	onFormSubmit: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	open,
	setOpen,
	onFormSubmit,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [open, setOpen]);

	const handleInputChange = (
		propertyName: string,
		selectedOption: OptionType
	) => {
		setFormState((prevState) => ({
			...prevState,
			[propertyName]: selectedOption,
		}));
	};

	const handleFormSubmit = (data: ArticleStateType) => {
		onFormSubmit(data);
		setOpen(false);
	};

	return (
		<>
			<ArrowButton closeOnClick={open} onClick={() => setOpen(!open)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, open && styles.container_open)}
				onClick={(e) => e.stopPropagation()}>
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
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => handleFormSubmit(defaultArticleState)}
						/>
						<Button
							title='Применить'
							type='button'
							onClick={() => handleFormSubmit(formState)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
