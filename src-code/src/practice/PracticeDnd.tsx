import {useState} from 'react';
import { DndContext,closestCenter,type DragEndEvent } from '@dnd-kit/core';
import {SortableContext,horizontalListSortingStrategy,arrayMove,useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem(props:{id:string}){

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        
        padding:'10px',
        border:'1px solid #ccc',
        marginBottom:'5px',
        background:'white',
        cursor:'move'
    }

    return (
        <div ref={setNodeRef}  style={style} {...attributes} {...listeners}>
            {props.id}
        </div>
    )
}

function PracticeDnd(){

    const [languages,setLanguages] = useState(['React','Vue','Angular','Svelte','Ember']);

    const handleDragEnd = (event:DragEndEvent) => {
        const {active,over} = event;

        if(active.id !== over?.id){
            setLanguages((items) => {
                const oldIndex = items.indexOf(String(active.id));
                const newIndex = items.indexOf(String(over?.id));
                
                return arrayMove(items,oldIndex,newIndex);
            })
        }
    }

    return (
        <div style={{ padding:50,width:300,margin:'0 auto'}}>
            <h3>🏆 编程语言排行榜</h3>

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={languages}
                    strategy={horizontalListSortingStrategy}
                >   
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {languages.map( lang => (
                        <SortableItem key={lang} id={lang} />
                    ))}
                    </div>
                </SortableContext>


            </DndContext>
        </div>

    );
}


export default PracticeDnd;