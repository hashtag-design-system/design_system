import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { CONFIG } from "../../config";
import { useClassnames } from "../../utils";
import { ComponentProps } from "../__helpers__";
import { Icon } from "./__helpers__";

export const CreditCardBrands = ["VISA", "AMEX", "MasterCard"] as const;

export type Props = {
  brand: typeof CreditCardBrands[number];
  creditNum: string;
  ownerName?: string;
  expirationDate?: Date | string;
};

export type FProps = Props & ComponentProps<"div">;

const CreditCard: React.FC<FProps> = ({ brand, creditNum, ownerName, expirationDate, ...props }) => {
  const [classNames, rest] = useClassnames("credit-card", props);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      VanillaTilt.init(ref.current, { max: 45, speed: 650, glare: true, "max-glare": 0.25 });
    }
  }, []);

  const url = (brand: string) => {
    const imageRequest = JSON.stringify({
      bucket: "hashtag.data",
      key: `credit_card_brands/${brand}`,
    });
    const newUrl = CONFIG.CLOUDFRONT_URL + btoa(imageRequest);
    return newUrl;
  };

  return (
    <div ref={ref} className={classNames} data-testid="credit-card" data-tilt {...rest}>
      <Icon />
      <img
        className={`credit-card__brand ${brand}`}
        id="credit-card"
        src={url(brand)}
        alt="Credit card brand logo"
        data-testid="credit-card-brand"
      />
      <div className="credit-card__info-container">
        <p className="credit-card__num" data-testid="credit-card-num">
          **** **** **** <span>{creditNum}</span>
        </p>
        {(ownerName || expirationDate) && (
          <div className="credit-card__owner-container">
            {ownerName && (
              <p className="credit-card__owner" data-testid="credit-card-owner">
                {ownerName}
              </p>
            )}
            {expirationDate && (
              <span className="credit-card__expiration" data-testid="credit-card-expiration">
                {typeof expirationDate === "string"
                  ? expirationDate
                  : `${(parseInt(expirationDate.getMonth().toString()) + 1).toLocaleString("en", {
                      minimumIntegerDigits: 2,
                    })}/${expirationDate.getFullYear().toString().substr(2, 4)}`}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CreditCard.displayName = "CreditCard";

export default CreditCard;
