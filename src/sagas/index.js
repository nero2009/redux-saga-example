import { takeLatest, call, put} from 'redux-saga/effects'
import axios from 'axios'
import {API_CALL_FAILURE, API_CALL_SUCCESS, API_CALL_REQUEST} from '../Constants'
import {URI , API_KEY} from '../Secrets'

//Watches for the API_CALL_REQUEST action then starts the fetchImage Saga
export function* watcher(){
    yield takeLatest(API_CALL_REQUEST, fetchImagesSaga)
}

//function that makes the api call and returns a Promise for response
function fetchImages(searchInput){
    console.log(searchInput)
    
    return axios({
        method: "get",
        url: `${URI}/?key=${API_KEY}&q=${searchInput}&image_type=photo&safesearch=true`
    })
}

//worker saga:  makes the api call when watcher saga sees the action
/*
both call and put are refered to object effects, 
we assign the yielded value to respoense so we can use it later in the function
*/
function* fetchImagesSaga({searchInput}){
    console.log("worker")
    try{
        let params =[searchInput]
        const response = yield call(fetchImages,...params)
        const images = response.data.hits
        
        
        // dispatch a success action to the store with the new dog
        // the put effect works like the redux dispatch, so here we dispatch an action with type of API_CALL_SUCCESS and the results from our Api call.
        yield put({type: API_CALL_SUCCESS, images})
    }catch(error){
        
        // dispatch a failure action to the store with the error
        yield put ({type: API_CALL_FAILURE, error})
    }
}