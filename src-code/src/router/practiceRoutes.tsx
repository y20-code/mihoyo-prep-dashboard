import React,{lazy} from 'react';

// import PracticeButton from '../practice/PracticeButton';

const PracticeButton = lazy(() => import('../practice/PracticeButton'))
const PracticeFloatButton = lazy(() => import('../practice/PracticeFloatButton'))
const PracticeTypography = lazy(() => import('../practice/PracticeTypography'))

export interface RouteConfing {
    path:string;
    element:React.ReactNode;
}

export const practiceRoutes: RouteConfing[] = [
    {
        path:'button',
        element:<PracticeButton/>
    },
    {
        path:'float-button',
        element:<PracticeFloatButton/>
    },
    {
        path:'Typography',
        element:<PracticeTypography/>
    }
    
]