import React from 'react';

import PracticeButton from '../practice/PracticeButton';

export interface RouteConfing {
    path:string;
    element:React.ReactNode;
}

export const practiceRoutes: RouteConfing[] = [
    {
        path:'button',
        element:<PracticeButton/>
    },
    
]