import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

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

	return (
		<>
			<ArrowButton willCloseOnClick={props.open} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, props.open && styles.container_open)}
				onClick={formClickHandler}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
