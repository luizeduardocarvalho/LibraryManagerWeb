import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PageHeader from '../PageHeader';
import BookItem, { Book } from './BookItem';

import styles from './styles';

let books: Book[] = [
	{
		id: 1,
		name: "A Feast for Crowns",
		author: "George R R Martin",
		image: "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png",
		summary: "This is the summary. This is the sumamary."
	},
	{
		id: 2,
		name: "Estilo Startup",
		author: "Eric Ries",
		image: "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png",
		summary: "This is the summary. This is the sumamary."
	}
];

function Books() {

	return (
		<View style={styles.container}>
			<PageHeader
				title="Books"
			></PageHeader>
			<ScrollView
				style={styles.bookList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16
				}}
			>
				{books.map((book: Book) => {
					return (
						<BookItem
							key={book.id}
							book={book}
						/>
					)
				})}
			</ScrollView>
		</View>
	);
}

export default Books;