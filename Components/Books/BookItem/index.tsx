import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

export interface Book {
	id: number;
	name: string;
	author: string;
	image: string;
	summary: string;
}

interface BookItemProps {
	book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
	return (		
		<View style={styles.container}>
			<View style={styles.bookContainer}>
				<Image
					style={styles.image}
					source={{ uri: book.image }}
				/>
				<View style={styles.infos}>
					<Text style={styles.name}>{book.name}</Text>
					<Text style={styles.author}>{book.author}</Text>
				</View>
			</View>

			<Text style={styles.summary}>{book.summary}</Text>
		</View>		
	);
}

export default BookItem;