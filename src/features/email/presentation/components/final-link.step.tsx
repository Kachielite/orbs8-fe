import {ShieldCheck} from 'lucide-react';
import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Button} from '@/core/common/presentation/components/ui/button';
import {CardDescription, CardFooter, CardHeader, CardTitle,} from '@/core/common/presentation/components/ui/card';

function FinalLinkStep() {
  const navigate = useNavigate();
  return (
    <>
      <CardHeader className="flex flex-col gap-4 text-center items-center mb-6">
        <ShieldCheck size={64} className="text-primary" />
        <CardTitle className="text-2xl lg:text-3xl">
          You’re all set 🎉
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm lg:text-lg w-full text-balance">
          OrbS8 is now organizing your <strong>bank notification emails</strong>.
          Your dashboard will update with your latest transactions shortly.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={() => navigate('/')} className="w-full">
          Go to Dashboard
        </Button>
      </CardFooter>
    </>
  );
}

export default FinalLinkStep;
