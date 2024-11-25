import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchHabits, Habit } from '../store/habit-slice';
import { LinearProgress, Paper, Typography } from '@mui/material';

const HabitStat = () => {

    const {habits,isLoading,error}= useSelector((state:RootState)=>state.habits);
    const dispatch=useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(fetchHabits());
    
    }, [])

    if(isLoading){
        return <LinearProgress />
    }

    if(error){
        return <Typography color='error'>{error}</Typography>
    }

    const getCompleteToday=()=>{
        const today=new Date().toISOString().split('T')[0];
        return habits.filter((h)=>h.completedDates.includes(today)).length;
    }

     const getStreak=(habit:Habit)=>{
        let streak=0;
        const currentDate=new Date();

        while(true){
            const dateString=currentDate.toISOString().split('T')[0];

            if(habit.completedDates.includes(dateString)){
                streak++;
                currentDate.setDate(currentDate.getDate()-1);
            }else{
                break;
            }
        }
        return streak;
    }

    const getLongestStreak=()=>{
        const longestStreak=Math.max(...habits.map(getStreak),0);
        return longestStreak;
    }
    

  return (
    <Paper elevation={2} sx={{p:2,mt:4}}>
        <Typography variant='h6' gutterBottom>
            Habbit Statistics
        </Typography>
        <Typography variant='body1' >
            Total Habits : {habits.length}
        </Typography>
        <Typography variant='body1' >
            Completed Today : {getCompleteToday()}
        </Typography>
        <Typography variant='body1' >
            Longest Streak :{getLongestStreak()}
        </Typography>
        
        
    </Paper>
  )
}

export default HabitStat