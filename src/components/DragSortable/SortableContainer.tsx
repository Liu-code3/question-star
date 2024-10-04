import type { FC } from 'react'
import type {
  DragEndEvent
} from '@dnd-kit/core'
import {
  DndContext,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

interface IProps {
  children: JSX.Element | JSX.Element[]
  items: Array<{ id: string, [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: FC<IProps> = ({ children, items, onDragEnd }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8 // 拖动元素移动8px的距离 才认定为拖动元素
      }
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over)
      return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.fe_id === active.id)
      const newIndex = items.findIndex(c => c.fe_id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
