import React ,{ useState ,useEffect } from 'react';
import { getImages ,searchImages } from "./api"

// const styles = {
//     form: {
//         margin: "1rem 0 1rem 0",
//         display: "grid",
//         gap: "20px"
//     },
    
//     // @media only screen and (min-width: 960px) {
//     //     form {
//     //         grid-template-columns: 5fr 1fr 1fr;
//     //     }
//     // }
    
//     form, input: {
//         padding: "14px",
//         border:" 3px solid rgb(225, 225, 225)",
//         borderRadius: "10px",
//         boxSizing: "border-box",
//         fontSize: "32px",
//     },
    
//     form, button: {
//         border: "none",
//         borderRadius: "10px",
//         fontSize: "32px",
//         padding: "16px",
//     },
    
//     form, button: {
//         backgroundColor: rgb(254, 80, 80),
//     },
    
//     img: {
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//     },
    
    // .image-grid: {
    //     display: "grid",
    //     gap: 0.5rem;
    //     grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    // }
    
    // .footer {
    //     display: flex;
    //     justify-content: center;
    // }
    
    // .footer button {
    //     font-size: 36px;
    //     border-radius: 10px;
    //     border: none;
    //     padding: 18px;
    //     margin: 3rem 0 3rem 0;
    // }

//}

const Gallery = () => {
    const [imageList, setImageList] = useState([]);
	const [nextCursor, setNextCursor] = useState(null);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const responseJson = await getImages();
			setImageList(responseJson.resources);
			setNextCursor(responseJson.next_cursor);
			console.log("this worked")
		};

		fetchData();
	}, []);

	const handleLoadMoreButtonClick = async () => {
		const responseJson = await getImages(nextCursor);
		setImageList((currentImageList) => [
			...currentImageList,
			...responseJson.resources,
		]);
		setNextCursor(responseJson.next_cursor);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const responseJson = await searchImages(searchValue, nextCursor);
		setImageList(responseJson.resources);
		setNextCursor(responseJson.next_cursor);
	};

	const resetForm = async () => {
		const responseJson = await getImages();
		setImageList(responseJson.resources);
		setNextCursor(responseJson.next_cursor);

		setSearchValue('');
	};


    return (
        <>
        <form onSubmit={handleFormSubmit}>
        {/* <form> */}
				<input
					value={searchValue}
					onChange={(event) => setSearchValue(event.target.value)}
					required='required'
					placeholder='Enter a search value...'
				></input>
				<button type='submit'>Search</button>
				<button type='button' onClick={resetForm}>
                {/* <button type='button' > */}
					Clear
				</button>
			</form>
			<div className='image-grid'>
				{imageList.map((image) => (
					<img src={image.url} alt={image.public_id}></img>
				))}
			</div>
			<div className='footer'>
				{nextCursor && (
					<button onClick={handleLoadMoreButtonClick}>Load More</button>
				)}
			</div>
            
        </>
    );
}

export default Gallery;
