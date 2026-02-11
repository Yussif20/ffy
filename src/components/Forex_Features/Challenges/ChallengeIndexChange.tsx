import { Button } from "@/components/ui/button";
import { useChangeIndexChallengeMutation } from "@/redux/api/challenge";
import { TChallenge } from "@/types/Challenge ";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ChallengeIndexChange({
  challenge,
  nextChallenge,
  prevChallenge,
}: {
  challenge: TChallenge;
  nextChallenge: TChallenge;
  prevChallenge: TChallenge;
}) {
  const [changeIndex, { isLoading }] = useChangeIndexChallengeMutation();

  const handleMoveTop = async () => {
    if (!prevChallenge || prevChallenge.order === undefined) {
      console.log("Cannot move up - no previous challenge or order missing", { prevChallenge });
      return;
    }
    console.log("Moving up from", challenge.order, "to", prevChallenge.order);
    const toastId = toast.loading("Moving...");
    try {
      await changeIndex({ id: challenge.id, order: prevChallenge.order }).unwrap();
      toast.dismiss(toastId);
      toast.success("Moved successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to move");
      console.error("Move error:", error);
    }
  };

  const handleMoveBottom = async () => {
    if (!nextChallenge || nextChallenge.order === undefined) {
      console.log("Cannot move down - no next challenge or order missing", { nextChallenge });
      return;
    }
    console.log("Moving down from", challenge.order, "to", nextChallenge.order);
    const toastId = toast.loading("Moving...");
    try {
      await changeIndex({ id: challenge.id, order: nextChallenge.order }).unwrap();
      toast.dismiss(toastId);
      toast.success("Moved successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to move");
      console.error("Move error:", error);
    }
  };

  const canMoveUp = prevChallenge && prevChallenge.order !== undefined;
  const canMoveDown = nextChallenge && nextChallenge.order !== undefined;

  return (
    <>
      <Button
        disabled={isLoading || !canMoveUp}
        size="icon"
        variant="outline"
        onClick={handleMoveTop}
        title={canMoveUp ? "Move up" : "Cannot move up"}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ArrowUp className="w-4 h-4" />
        )}
      </Button>

      {/* Move Bottom */}
      <Button
        disabled={isLoading || !canMoveDown}
        size="icon"
        variant="outline"
        onClick={handleMoveBottom}
        title={canMoveDown ? "Move down" : "Cannot move down"}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )}
      </Button>
    </>
  );
}