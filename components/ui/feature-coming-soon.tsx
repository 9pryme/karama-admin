import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeatureComingSoonProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
}

export default function FeatureComingSoon({ 
  title = "Feature Coming Soon", 
  description = "This feature is currently under development and will be available soon.",
  showBackButton = true 
}: FeatureComingSoonProps) {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              We're working hard to bring you this feature.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon for updates!
            </p>
          </div>
          
          {showBackButton && (
            <Button 
              onClick={() => router.back()} 
              variant="outline" 
              className="mt-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 