import { useState, useRef, FormEvent } from 'react';
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

type ArticleParamsFormProps = {
	onFormSubmit: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [formOpened, setFormOpened] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLDivElement>(null);

	const handleInputChange = (
		propertyName: string,
		selectedOption: OptionType
	) => {
		setFormState((prevState) => ({
			...prevState,
			[propertyName]: selectedOption,
		}));
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		props.onFormSubmit(formState);
		setFormOpened(false);
	};

	return (
		<>
			<ArrowButton
				closeOnClick={formOpened}
				onClick={() => setFormOpened(!formOpened)}
			/>

			<aside
				ref={formRef}
				className={clsx(styles.container, formOpened && styles.container_open)}
				onClick={(e) => e.stopPropagation()}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
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
							onClick={() => {
								setFormState(defaultArticleState);
								props.onFormSubmit(defaultArticleState);
								setFormOpened(false);
							}}
						/>

						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
