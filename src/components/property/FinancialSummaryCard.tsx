import { formatCurrency, formatPercentage } from "../../utils/formatters";

type FinancialSummaryCardProps = {
  price: number;
  yield: number;
};

const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({
  price,
  yield: yieldValue
}) => {
  return (
    <div className="border rounded p-2 bg-light">
      
      <div className="row text-center">
        
        {/* Price */}
        <div className="col">
          <div className="small text-muted">Price</div>
          <div className="fw-semibold">
            {formatCurrency(price)}
          </div>
        </div>

        {/* Yield */}
        <div className="col">
          <div className="small text-muted">Yield</div>
          <div className="fw-semibold">
            {formatPercentage(yieldValue)}
          </div>
        </div>

      </div>

    </div>
  );
};

export default FinancialSummaryCard;