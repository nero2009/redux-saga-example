import { takeLatest, call, put} from 'redux-saga/effects'
import axios from 'axios'
import {URI,API_KEY, API_CALL_FAILURE, API_CALL_SUCCESS, API_CALL_REQUEST} from '../Constants'

//watcher saga: watches for actions dispatched to the store, start worker saga
export function* watcherSaga(){
    yield takeLatest(API_CALL_REQUEST, workerSaga)
}

//function that makes the api request and returns a Promise for response
function fetchImages(searchInput){
    console.log(searchInput)
    
    return axios({
        method: "get",
        url: `${URI}/?key=${API_KEY}&q=${searchInput}&image_type=photo&safesearch=true`
    })
}

//worker saga:  makes the api call when watcher saga sees the action

function* workerSaga({searchInput}){
    console.log("worker")
    try{
        let params =[searchInput]
        const response = yield call(fetchImages,...params)
        const images = response.data.hits
        
        
        // dispatch a success action to the store with the new dog
        yield put({type: API_CALL_SUCCESS, images})
    }catch(error){
        
        // dispatch a failure action to the store with the error
        yield put ({type: API_CALL_FAILURE, error})
    }
}