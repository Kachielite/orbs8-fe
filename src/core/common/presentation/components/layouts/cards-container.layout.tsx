import React, {ReactNode} from 'react'

import CardLoaders from "@/core/common/presentation/components/loaders/card-loader";

function CardsContainerLayout({isLoading, numberOfCards, children}:{isLoading: boolean; numberOfCards: number; children: ReactNode}) {
    return (
         <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                 {isLoading ? (
        <CardLoaders count={numberOfCards} />
      ) : (
        children
      )}
        </div>
    )
}

export default CardsContainerLayout
