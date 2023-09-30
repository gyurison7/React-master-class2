import { PriceProps } from "../type";
import styled from "styled-components";

interface PercentChangeItemProps {
  label: string;
  value?: number;
}

interface PriceItemProps {
    value?: number;
}

const PercentChangeItem = ({ label, value }: PercentChangeItemProps) => {
  return (
    <PriceItem value={value}>
      <span>{label}</span>
      <span>{value}%</span>
    </PriceItem>
  );
};

export function Price({ priceLoading, priceData }: PriceProps) {
  return (
    <div>
      {priceLoading ? (
        "Loading..."
      ) : (
        <>
          <FirstPriceItem>
            <span>최고가</span>
            <span>${priceData?.quotes.USD.ath_price.toFixed(3)}</span>
          </FirstPriceItem>
          <Container>
            <PercentChangeItem
              label="지난 1시간동안"
              value={priceData?.quotes.USD.percent_change_1h}
            />
            <PercentChangeItem
              label="지난 6시간동안"
              value={priceData?.quotes.USD.percent_change_6h}
            />
          </Container>
          <Container>
            <PercentChangeItem
              label="지난 12시간동안"
              value={priceData?.quotes.USD.percent_change_12h}
            />
            <PercentChangeItem
              label="지난 24시간동안"
              value={priceData?.quotes.USD.percent_change_24h}
            />
          </Container>
          <Container>
            <PercentChangeItem
              label="지난 7일동안"
              value={priceData?.quotes.USD.percent_change_7d}
            />
            <PercentChangeItem
              label="지난 30일동안"
              value={priceData?.quotes.USD.percent_change_30d}
            />
          </Container>
        </>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const PriceItem = styled.div<PriceItemProps>`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  align-items: center;

  span:first-child {
    font-size: 12px;
    font-weight: 400;
  }
  span:last-child {
    color: ${({ value }) => (value !== undefined && value >= 0 ? '#0be881' : '#ff5e57')}
  }
`;

const FirstPriceItem = styled(PriceItem)`
  span:last-child {
    color: ${(props) => props.theme.textColor};
    font-size: 28px;
  }
`;
