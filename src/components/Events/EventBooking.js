import React, {useEffect, Fragment, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {Typography,Card, Box, TextField, MenuItem} from '@material-ui/core';
import  {makeStyles}     from '@material-ui/core/styles';

import {getEvent} from '../../reducers/Events';


const useStyles = makeStyles((themes) => ({
	container: {
		width:'550px',
		margin:'auto'
	}
}))
const EventBooking = (props) => {
   
	const {event}  = useSelector(state => state.Events);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [seat, setseat] = useState(1)
	const id = props.match.params.id;


	useEffect(() => {
			dispatch(getEvent(id))
	}, []);

	const seats = [
		{
			value:1,
			label:1
		},
		{
			value:2,
			label:2
		},
		{
			value:3,
			label:3
		},
		{
			value:4,
			label:4
		},
		{
			value:5,
			label:5
		},
		{
			value:6,
			label:6
		}
	]

	return (
		<div className={classes.container}>
			{event.length>0 && (
				<Fragment>
					<Typography variant="h5">
						{ event[0].name}
					</Typography>
					<Typography color="textSecondary" variant="body2" className="pt-10">
						Number of available seats : {event[0].availableSeats}
					</Typography>
					<Box mt={2} bgcolor="background.parer">
						<Card className={`p-15`}>
							<form className={classes.root} noValidate autoComplete="off">
								<TextField id="standard-basic" label="User Name" fullWidth/>
								<TextField id="standard-basic" label="Email" fullWidth/>
								<TextField
									id="standard-select-currency"
									select
									label="Select"
									value={seat}
									onChange={(e) => setseat(e.target.value)}
								>
									{seats.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
        				</TextField>
							</form>
						</Card>
					</Box>
				</Fragment>
			)}
		</div>
	)
}

export default EventBooking
