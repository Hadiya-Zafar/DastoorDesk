import logging
import sys

# Setup a professional logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("dastoor.log") # This creates a file you can show your professors!
    ]
)

logger = logging.getLogger("DastoorDesk")