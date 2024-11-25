import './App.css';
import {Provider} from 'react-redux';
import store from './store/store'
import {Container, Typography } from '@mui/material'
import AddHabitForm from './component/add-habit-form';
import HabitList from './component/habit-list';
import HabitStat from './component/habit-stat';

function App() {
  return (
    <Provider  store={store}>
      <Container maxWidth='sm'>
        <Typography component='h1' variant='h2' text-align='centre'>Habit Tracker</Typography>
        <AddHabitForm/>
        <HabitList/>
        <HabitStat/>
      </Container>
    </Provider>
  )

}

export default App;