import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";

import { 
	Grid, 
	Card, 
	Typography, 
	CardContent, 
	CardActions,
	Button
} from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';
import EventSeatIcon from '@material-ui/icons/EventSeat';

import {searchEvents} from '../../reducers/Events'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},

	cardHeader: {
		fontSize: '12px'
	},
	thumb:{
		width:'100%'
	},
	media:{
		height:'250px',
		overflow:'hidden'
	},
	cardAction:{
		display:"flex",
		justifyContent: 'center',
		paddingBottom:'30px'
	},

	searchBox:{
		marginBottom:'15px'
	},
	noResult: {
		padding:theme.spacing(2),
		textAlign:'centers'
	},
	cardContent: {
		display:'flex',
		justifyContent:'space-between'
	},
	eventDate: {
		display:'flex',
		alignItems:'center',
		fontSize:'12px'
	}
	
}));

const EventList = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const  {eventList}  = useSelector((state) => state.Events);
	const [newValue, setnewValue] = useState('');

	const onChangeHandler = (e) =>  {
			setnewValue(e);
			dispatch(searchEvents(e))
	}
	const onSubmit = (input) => {
		dispatch(searchEvents(input))
	}

	const onCancelSearch = () => {
		dispatch(searchEvents(''))
	}

	const eventBookingHandler = () => {
		props.history.push('./event-booking/1')
	}

	return (
		<div className={classes.root}>
			<SearchBar
				value={newValue}
				onChange={ onChangeHandler}
				onRequestSearch={() => onSubmit(newValue)}
				className={classes.searchBox }
				placeholder="Search Events"
				onCancelSearch={onCancelSearch}
			/>
			<Grid container spacing={3}>
				{eventList && eventList.length !== 0 && eventList.map(item => {
					return(
						<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
							<Card>
									<div className={classes.media}>
											<img src={item.imgthumb} className={classes.thumb} alt={item.name}/>
									</div>
									<CardContent className={classes.cardContent}>
										<div className={classes.eventDate}>
											<EventIcon fontSize="small" className="pr-5" color="primary"/>
											<span> {item.date}</span>
										</div>
										<div className={classes.eventDate}>
											<EventSeatIcon fontSize="small" className="pr-5" color="primary"/>
											<span> {item.availableSeats}</span>
										</div>
										
									</CardContent>
									<CardActions className={classes.cardAction}>
										<Button variant="contained" color="primary" disabled={item.availableSeats === 0? true : false} onClick={eventBookingHandler}>
											{item.availableSeats === 0? 'Sold Out': 'Book Now' }
										</Button>
									</CardActions>
							</Card>
						</Grid>
					)
				})}
				{eventList.length === 0 && (
					<Grid  item xs={12}>
						<Card className={classes.noResult}>
							<Typography variant="h6" className='text-center'>
								No Result Found
							</Typography>
						</Card>
					</Grid>
				)}
			</Grid>
		</div>
	)
}

export default EventList
